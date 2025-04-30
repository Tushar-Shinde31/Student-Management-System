import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import CreateAdmission from "./pages/Admin/Admission/CreateAdmission";
import CreateDivision from "./pages/Admin/Admission/CreateDivision";
import Sidebar from "./components/AdminSidebar";
import Navbar from "./components/Navbar";
import StudentSidebar from "./components/StudentSidebar";
import StudentAdmission from "./pages/students/studentAdmission"; // 👈 import this

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = useLocation();
  const isStudentRoute = location.pathname.startsWith("/student");

  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow relative">
        {/* Conditionally show either AdminSidebar or StudentSidebar */}
        {isStudentRoute ? (
          <StudentSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        ) : (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <div className="flex-1 md:ml-64 p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/admission/create" element={<CreateAdmission />} />
              <Route path="/admin/admission/create-division" element={<CreateDivision />} />

              {/* Add your student-specific routes here */}
              <Route path="/student/profile" element={<div>Student Profile Page</div>} />
              <Route path="/student/attendance" element={<div>Attendance Page</div>} />
              <Route path="/student/admission/fill-form" element={<StudentAdmission />} />
              {/* etc... */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
