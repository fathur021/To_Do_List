// import jsonwebtoken untuk verifikasi token
const jwt = require("jsonwebtoken");
//import user untuk query ke database
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    //1. ambil header Authorizationd dari request(berisi token)
    const authHeader = req.headers.authorization;

    //2. Cek apakah header ada dan formatnya "Beare" <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan. Silahkan login terlebih dahulu",
      });
    }
    //3 ambil token nya saja (hilangkan Kata Beare)
    const token = authHeader.split(" ")[1];

    // 4. Verifikasi token dengan JWT_SECRET
    // Kalau token valid → dapat data user (decoded)
    // Kalau token tidak valid → throw error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Cari user di database berdasarkan ID dari token
    // .select("-password") → exclude field password (jangan dikirim)
    const user = await User.findById(decoded.id).select("-password");

    //6. kalau user tidak ditemukan di database =>tolak akses
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // 7. Simpan data user ke req.user
    // Supaya bisa dipakai di controller berikutnya
    req.user = user;

    // 8. Lanjut ke middleware/controller berikutnya
    next();

  } catch (error) {
    // handle Error 

    // [FIXED] JsonWebTokenError = token tidak valid, BUKAN expired
    if(error.name === "JsonWebTokenError"){
        return res.status(401).json({
            success:false,
            message:"Token tidak valid"
        });
    }
    // [FIXED] Tambahkan handler untuk TokenExpiredError
    if(error.name === "TokenExpiredError"){
        return res.status(401).json({
            success:false,
            message:"Token sudah kadaluarsa. Silahkan login ulang"
        });
    }
    //kalau error lain yang tak terduga
    return res.status(500).json({
        success:false,
        message:"Server Error"
    })

  }
};
module.exports = {authenticate};