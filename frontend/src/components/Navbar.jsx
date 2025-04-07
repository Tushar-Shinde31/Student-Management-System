import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Sidebar toggle for mobile */}
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <Menu />
          </button>
          <a href="/" className="text-white text-lg font-bold">CSMSS PORTAL</a>
        </div>

        <ul className="flex space-x-4">
          <li><a href="/home" className="text-white hover:underline">Home</a></li>
          <li><a href="/about" className="text-white hover:underline">About</a></li>
          <li><a href="/Logout" className="text-white hover:underline">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
