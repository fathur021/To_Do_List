const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../validators/userValidator");

// ==========================================
// ===== REGISTER =====
// ==========================================
const register = async (req, res) => {
    try {
        // 1. Validasi input dengan Joi
        const { error, value } = validateRegister(req.body);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validasi gagal",
                errors: errors
            });
        }

        // 2. Ambil data yang sudah divalidasi
        const { name, email, password } = value;

        // 3. Cek email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email sudah terdaftar. Silahkan gunakan email lain"
            });
        }

        // 4. Buat user baru (password otomatis di-hash oleh pre('save'))
        const user = await User.create({ name, email, password });

        // 5. Response sukses (tanpa password)
        res.status(201).json({
            success: true,
            message: "Registrasi berhasil! Silahkan login",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        // Handle error validasi Mongoose
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validasi database gagal",
                errors: errors
            });
        }

        // Handle error lainnya
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};

// ==========================================
// ===== LOGIN =====
// ==========================================
const login = async (req, res) => {
    try {
        // 1. Validasi input dengan Joi
        const { error, value } = validateLogin(req.body);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validasi gagal",
                errors: errors
            });
        }

        // 2. Ambil data yang sudah divalidasi
        const { email, password } = value;

        // 3. Cari user berdasarkan email (sertakan password)
        const user = await User.findOne({ email }).select("+password");

        // 4. Cek apakah user ada
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email atau password salah"
            });
        }

        // 5. Cek password menggunakan method comparePassword
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email atau password salah"
            });
        }

        // ===== 6. BUAT ACCESS TOKEN (15 menit) =====
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // ===== 7. BUAT REFRESH TOKEN (7 hari) =====
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // ===== 8. SIMPAN REFRESH TOKEN DI DATABASE =====
        user.refreshToken = refreshToken;
        await user.save();

        // ===== 9. KIRIM REFRESH TOKEN SEBAGAI HTTP-ONLY COOKIE =====
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,      // JavaScript tidak bisa akses
            secure: false,       // true untuk production (HTTPS)
            sameSite: "lax",     // Proteksi CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
            path: "/api/auth/refresh"
        });

        // ===== 10. RESPONSE (HANYA ACCESS TOKEN) =====
        res.json({
            success: true,
            message: "Login berhasil",
            token: accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};

// ==========================================
// ===== REFRESH ACCESS TOKEN =====
// ==========================================
const refreshAccessToken = async (req, res) => {
    try {
        // 1. Ambil refresh token dari cookie
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token tidak ditemukan. Silahkan login ulang"
            });
        }

        // 2. Verifikasi refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // 3. Cek di database apakah refresh token masih valid
        const user = await User.findOne({
            _id: decoded.id,
            refreshToken: refreshToken
        });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Refresh token tidak valid. Silahkan login ulang"
            });
        }

        // ===== 4. BUAT ACCESS TOKEN BARU =====
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // ===== 5. (OPSIONAL) ROTASI REFRESH TOKEN =====
        // Hapus token lama, buat token baru (lebih aman)
        const newRefreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // Update refresh token di database
        user.refreshToken = newRefreshToken;
        await user.save();

        // Kirim refresh token baru di cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh"
        });

        // 6. Response dengan access token baru
        res.json({
            success: true,
            token: newAccessToken
        });

    } catch (error) {
        // Handle error token
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({
                success: false,
                message: "Refresh token tidak valid"
            });
        }
        if (error.name === "TokenExpiredError") {
            // Hapus cookie yang expired
            res.clearCookie("refreshToken");
            return res.status(403).json({
                success: false,
                message: "Refresh token sudah kadaluarsa. Silahkan login ulang"
            });
        }

        console.error("Refresh token error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};

// ==========================================
// ===== GET PROFILE =====
// ==========================================
const getProfile = async (req, res) => {
    try {
        // req.user sudah diisi oleh middleware authenticate
        res.json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};

// ==========================================
// ===== LOGOUT =====
// ==========================================
const logout = async (req, res) => {
    try {
        // 1. Ambil refresh token dari cookie
        const refreshToken = req.cookies.refreshToken;

        // 2. Hapus refresh token dari database
        if (refreshToken) {
            await User.findOneAndUpdate(
                { refreshToken: refreshToken },
                { refreshToken: null }
            );
        }

        // 3. Hapus cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/api/auth/refresh"
        });

        // 4. Response
        res.json({
            success: true,
            message: "Logout berhasil"
        });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};

// ==========================================
// ===== EXPORT =====
// ==========================================
module.exports = {
    register,
    login,
    refreshAccessToken,
    getProfile,
    logout
};