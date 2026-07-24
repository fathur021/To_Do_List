import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaSearch, FaSignOutAlt } from "react-icons/fa";

const TopBar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <FaBook className="text-blue-600 text-2xl" />
          <h1 className="text-xl font-semibold text-blue-600">
            Notes Mahasiswa
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="search"
            placeholder="Cari catatan..."
            className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition duration-200"
          />
        </div>

        {/* Logout Button */}
        <div>
          <button className="flex items-center gap-2 text-blue-600 border-2 border-blue-600 font-medium text-sm transition duration-200 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
