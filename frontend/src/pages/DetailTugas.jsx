import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams untuk ambil ID

const DetailTugas = () => {
  // Ambil parameter ID dari URL
  const { id } = useParams();
  
  // Untuk sementara, kita simpan data di state lokal
  // Nanti bisa diambil dari props atau context
  const todoData = {
    id: id,
    text: `Tugas dengan ID: ${id}`,
    completed: false,
    createdAt: new Date().toLocaleString()
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">
          Detail Tugas
        </h1>
        
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">ID Tugas</p>
            <p className="font-mono text-lg">{todoData.id}</p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Nama Tugas</p>
            <p className="text-lg">{todoData.text}</p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-lg ${todoData.completed ? 'text-green-500' : 'text-yellow-500'}`}>
              {todoData.completed ? '✅ Selesai' : '⏳ Belum Selesai'}
            </p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Dibuat Pada</p>
            <p className="text-lg">{todoData.createdAt}</p>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <Link 
            to="/" 
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-600 transition"
          >
            Kembali
          </Link>
          <button 
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Tugas
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTugas;