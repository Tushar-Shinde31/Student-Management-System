import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import CreateAdmission from "./pages/Admin/Admission/CreateAdmission";
import Sidebar from "./components/AdminSidebar";
import Navbar from "./components/Navbar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-10 md:ml-64 p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/admission/create" element={<CreateAdmission />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
