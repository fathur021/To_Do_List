const Joi = require("joi");

const catatanSchema = Joi.object({
    judul: Joi.string()
        .required()
        .max(100)
        .messages({
            "any.required": "Judul wajib di isi",
            "string.empty": "Judul tidak boleh kosong",
            "string.max": "Judul maksimal 100 karakter"
        }),
    deskripsi: Joi.string()
        .max(500)
        .allow("", null)
        .messages({
            "string.max": "Deskripsi maksimal 500 karakter"
        }),
    warna: Joi.string()
        .pattern(/^#([0-9A-Fa-f]{3}){1,2}$/)
        .allow("", null)
        .default("#ffffff")
        .messages({
            "string.pattern.base": "Format warna tidak valid (contoh: #ff0000)"
        }),
    prioritas: Joi.string()
        .valid("Rendah", "Sedang", "Tinggi")
        .default("Sedang")
        .messages({
            "any.only": "Prioritas harus Rendah, Sedang, atau Tinggi"
        }),
    status: Joi.string()
        .valid("Belum Mulai", "Sedang Dikerjakan", "Selesai")
        .default("Belum Mulai")
        .messages({
            "any.only": "Status harus Belum Mulai, Sedang Dikerjakan, atau Selesai"
        }),
    tenggat: Joi.date()
        .allow(null)
        .messages({
            "date.base": "Format tenggat tidak valid"
        })
});

exports.validateCatatan = (data) => catatanSchema.validate(data, { abortEarly: false });
