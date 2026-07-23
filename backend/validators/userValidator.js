const Joi = require("joi");

// Schema Register (Perbaiki typo: regiterSchema → registerSchema)
const registerSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .messages({
            "any.required": "Nama wajib di isi",
            "string.empty": "Nama tidak boleh kosong",
            "string.min": "Nama minimal 3 karakter",
            "string.max": "Nama maksimal 50 karakter",
            "string.pattern.base": "Nama hanya boleh huruf dan spasi",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email wajib diisi",
            "string.email": "Format email tidak valid",
            "string.empty": "Email tidak boleh kosong",
        }),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(/[a-zA-Z]/)
        .pattern(/[0-9]/)
        .messages({
            "any.required": "Password wajib diisi",
            "string.min": "Password minimal 6 karakter",
            "string.pattern.base": "Password harus mengandung huruf dan angka",
        }),
});

// Schema Login (Tambahkan ini juga biar lengkap)
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email wajib diisi",
            "string.email": "Format email tidak valid",
            "string.empty": "Email tidak boleh kosong",
        }),
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password wajib diisi",
        }),
});

// Export
exports.validateRegister = (data) => registerSchema.validate(data, { abortEarly: false });
exports.validateLogin = (data) => loginSchema.validate(data, { abortEarly: false });