const Joi = require("joi");

const matkulSchema = Joi.object({
    namaMatkul: Joi.string().required().messages({"any.required" : "Nama matkul wajib di isi"})
})

exports.validateMatkul = (data) => matkulSchema.validate(data);
