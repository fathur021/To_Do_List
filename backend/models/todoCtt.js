const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  catatanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catatan',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tugas: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  selesai: {
    type: Boolean,
    default: false
  },
  prioritas: {
    type: String,
    enum: ['Rendah', 'Sedang', 'Tinggi'],
    default: 'Sedang'
  }
}, {
  timestamps: true
});

// Index untuk mempercepat query
todoSchema.index({ catatanId: 1, selesai: 1 });
todoSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Todo', todoSchema);