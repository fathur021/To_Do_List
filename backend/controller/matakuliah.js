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

const updateMatkul = async(req,res)=>{
    try {
        const {error, value} = validateMatkul(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message: error.details[0].message
            })
        }
        const matkul = await Matakuliah.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            value,
            { new: true }
        )

        if(!matkul){
            return res.status(404).json({
                success:false,
                message:"Matkul tidak di temukan"
            })
        }
    } catch (error) {
        
    }
}
module.exports = {
  createMatkul,
  getMatkul,
};
