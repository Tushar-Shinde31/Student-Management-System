import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import CreateAdmission from "./pages/Admin/Admission/CreateAdmission";
import Sidebar from "./components/AdminSidebar"; // Import Sidebar
import Navbar from "./components/Navbar"; // Import Navbar

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-grow">
        {/* Sidebar (Fixed) */}
        <Sidebar />

        {/* Main Content (Scrollable) */}
        <div className="ml-64 w-full p-4 overflow-y-auto">
          <Routes>
            {/* Admin Dashboard */}
            <Route path="/admin" element={<Dashboard />} />

            {/* Admission Section */}
            <Route path="/admin/admission/create" element={<CreateAdmission />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
