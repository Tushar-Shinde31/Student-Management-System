import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a href="/">CSMSS PORTAL</a>
        </div>
        <ul className="flex space-x-4">
          <li><a href="/home" className="text-white hover:underline">Home</a></li>
          <li><a href="/about" className="text-white hover:underline">About</a></li>
          <li><a href="/Logout" className="text-white hover:underline">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;