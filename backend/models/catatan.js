const mongoose = require('mongoose');

const catatanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matkulId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matakuliah',
    required: true
  },
  judul: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  deskripsi: {
    type: String,
    trim: true,
    maxlength: 500
  },
  warna: {
    type: String,
    trim: true,
    default: '#ffffff'
  },
  prioritas: {
    type: String,
    enum: ['Rendah', 'Sedang', 'Tinggi'],
    default: 'Sedang'
  },
  status: {
    type: String,
    enum: ['Belum Mulai', 'Sedang Dikerjakan', 'Selesai'],
    default: 'Belum Mulai'
  },
  tenggat: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Catatan', catatanSchema);
