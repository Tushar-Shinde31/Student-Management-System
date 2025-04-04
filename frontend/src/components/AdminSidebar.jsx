import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  UserPlus,
  BookOpen,
  GraduationCap,
  Calendar,
  MessageCircle,
  ClipboardCheck,
  PlusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";


const Sidebar = () => {
  const location = useLocation();
  const [isAdmissionOpen, setAdmissionOpen] = useState(false);

  const toggleAdmissionDropdown = () => {
    setAdmissionOpen(!isAdmissionOpen);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 overflow-y-auto">
      {/* Logo Section */}
      <Link to="/admin" className="flex items-center p-4 border-b border-gray-800">
      <img src="/assets/csmssengg.png" alt="CSMSS Logo" className="h-10 w-10 rounded-full" />
        <span className="ml-3 text-xl font-semibold">CSMSS PORTAL</span>
      </Link>

      {/* Navigation Menu */}
      <div className="mt-4">
        <nav>
          {/* Home */}
          <Link
            to="/admin"
            className={`flex items-center p-3 rounded-lg transition duration-300 hover:bg-blue-600 ${
              location.pathname === "/admin" ? "bg-blue-600" : ""
            }`}
          >
            <Home className="mr-3" />
            Home
          </Link>

          {/* Admission Dropdown */}
          <div>
            <button
              onClick={toggleAdmissionDropdown}
              className="flex items-center w-full p-3 rounded-lg transition duration-300 hover:bg-blue-600"
            >
              <GraduationCap className="mr-3" />
              Admission
              {isAdmissionOpen ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />}
            </button>

            {isAdmissionOpen && (
              <div className="ml-6">
                <Link
                  to="/admin/admission/create"
                  className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-600 ${
                    location.pathname === "/admin/admission/create" ? "bg-blue-600" : ""
                  }`}
                >
                  <PlusCircle className="mr-2" />
                  Create Admission
                </Link>

                <Link
                  to="/admin/admission/student-promotion"
                  className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-600 ${
                    location.pathname === "/admin/admission/student-promotion" ? "bg-blue-600" : ""
                  }`}
                >
                  <ClipboardCheck className="mr-2" />
                  Student Promotion
                </Link>

                <Link
                  to="/admin/admission/cancel-student"
                  className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-600 ${
                    location.pathname === "/admin/admission/cancel-student" ? "bg-blue-600" : ""
                  }`}
                >
                  <MessageCircle className="mr-2" />
                  Cancel Student
                </Link>

                <Link
                  to="/admin/admission/view-students"
                  className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-600 ${
                    location.pathname === "/admin/admission/view-students" ? "bg-blue-600" : ""
                  }`}
                >
                  <Users className="mr-2" />
                  View Students
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
