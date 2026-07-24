const matakuliah = require("../models/matakuliah");
const Matakuliah = require("../models/matakuliah");
const { validateMatkul } = require("../validators/matakuliahValidator");

const createMatkul = async (req, res) => {
  try {
    const { error, value } = validateMatkul(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const matakuliah = await Matakuliah.create({
      ...value,
      userId: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Berhasil membuat matakuliah",
      data: matakuliah,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMatkul = async (req, res) => {
  try {
    const matakuliah = await Matakuliah.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      data: matakuliah,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateMatkul = async (req, res) => {
  try {
    const { error, value } = validateMatkul(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const matkul = await Matakuliah.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      value,
      { new: true },
    );

    if (!matkul) {
      return res.status(404).json({
        success: false,
        message: "Matkul tidak di temukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil Update Mata Kuliah",
      data: matkul,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteMatkul = async (req, res) => {
    try {
        const matkul = await Matakuliah.findOneAndDelete({_id:req.params.id, userId:req.user._id});
        if(!matkul){
            return res.status(404).json({
                success:false,
                message:"Mata kuliah tidak ditemukan"
            })
        };
        return res.status(200).json({
            success:true,
            message:"Berhasil menghapus Matakuliah"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
};


module.exports = {
  createMatkul,
  getMatkul,
  updateMatkul,
  deleteMatkul,
};
