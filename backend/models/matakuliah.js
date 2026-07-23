const mongoose = require("mongoose");

const matakuliahSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        namaMatkul:{
            type: String,
            required:true,
            trim:true,
            unique:true
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Matakuliah", matakuliahSchema)