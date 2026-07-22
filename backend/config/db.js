//mengimport library mongoose untuk berinteraksi dengan MongoDb
const mongoose = require("mongoose");

//mendefiniskan fungsi asyncronous bernama connectDB
async function connectDB(){
    try {
        // Menghubungkan ke MongoDB menggunakan URI yang disimpan di environment variable DB_URI
        // await menunggu proses koneksi selesai sebelum melanjutkan ke baris berikutnya
        await mongoose.connect(process.env.DB_URI);
        // Jika koneksi berhasil, tampilkan pesan sukses di console
        console.log("MongoDB connected");
    } catch (error) {
         // Jika terjadi error saat koneksi, tangkap errornya
        console.error("MongoDB connection Error:", error);
         // Hentikan proses aplikasi dengan status code 1 (menandakan error/failure)
        process.exit(1);
    }

}

// Ekspor fungsi connectDB agar bisa digunakan di file lain
module.exports = connectDB;