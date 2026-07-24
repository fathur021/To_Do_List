const Catatan = require("../models/catatan");
const Matakuliah = require("../models/matakuliah");
const { validateCatatan } = require("../validators/catatanValidator");

const createCatatan = async (req, res) => {
  try {
    //1 check apakah matakuliah ada dan milik user
    const matkul = await Matakuliah.findOne({
      _id: req.params.matkulId,
      userId: req.user._id,
    });
    if (!matkul) {
      return res.status(404).json({
        success: false,
        message: "Matakuliah tidak ditemukan",
      });
    }

    const { error, value } = validateCatatan(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const catatan = await Catatan.create({
      ...value,
      userId: req.user._id,
      matkulId: req.params.matkulId,
    });

    return res.status(201).json({
      success: true,
      message: "berhasil membuat catatan",
      data: catatan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Fungsi untuk mengambil semua catatan berdasarkan matkul dan user yang login
const getCatatan = async (req, res) => {
  try {
    // Cari semua catatan yang matkulId-nya sesuai di URL DAN userId-nya milik user yang sedang login
    const catatan = await Catatan.find({
      matkulId: req.params.matkulId, // ambil matkulId dari URL parameter
      userId: req.user._id, // ambil userId dari token yang sudah diverifikasi middleware authenticate
    }).sort({ createdAt: -1 }); // urutkan dari yang terbaru (descending)

    // Kirim response berhasil dengan status 200 dan data catatan yang ditemukan
    return res.status(200).json({
      success: true, // tanda bahwa request berhasil
      data: catatan, // data catatan yang sudah difilter
    });
  } catch (error) {
    // Jika terjadi error (misal database down), cetak error di console server
    console.error(error);
    // Kirim response error dengan status 500 (Internal Server Error)
    return res.status(500).json({
      success: false, // tanda bahwa request gagal
      message: "Server Error", // pesan error untuk dikirim ke client
    });
  }
};

const updateCatatan = async(req,res)=>{
  try {
    // Cek apakah matkul ada dan milik user yang login
    const matkul = await Matakuliah.findOne({
      _id: req.params.matkulId,
      userId: req.user._id
    })
    if(!matkul){
      return res.status(404).json({
        success:false,
        message:"Matakuliah tidak ditemukan"
      })
    }

    const {error,value} = validateCatatan(req.body);
    if(error){
      return res.status(400).json({
        success:false,
        message:error.details[0].message
      })
    }
    const catatan = await Catatan.findByIdAndUpdate(
      {_id:req.params.id, userId:req.user._id},
      value,
      {new:true}
    )
    if(!catatan){
      return res.status(404).json({
        success:false,
        message:"Catatan tidak ditemukan"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Berhasil update catatan",
      data: catatan
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}

const deleteCatatan = async(req,res)=>{
  try {
    const matkul = await Matakuliah.findOne({
      _id: req.params.matkulId,
      userId:req.user._id
    });

    if(!matkul){
      return res.status(404).json({
        success:false,
        message:"Matakuliah tidak ditemukan"
      })
    }

    const catatan = await Catatan.findOneAndDelete({
      _id:req.params.id,
      userId: req.user._id,
    })
    if(!catatan){
      return res.status(404).json({
        success:false,
        message:"Catatan tidak ditemukan"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Berhasil menghapus catatan"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}

module.exports = {
  createCatatan,
  getCatatan,
  updateCatatan,
  deleteCatatan
};
