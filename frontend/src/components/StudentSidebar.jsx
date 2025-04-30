import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  GraduationCap,
  ClipboardCheck,
  PlusCircle,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isAdmissionOpen, setAdmissionOpen] = useState(false);

  const toggleAdmissionDropdown = () => setAdmissionOpen(!isAdmissionOpen);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-50 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="mt-4">
          <nav>
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
                <Link to="/student/admission/fill-form" className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-600 ${location.pathname === "/student/admission/fill-form" ? "bg-blue-600" : ""}`}>
                    <PlusCircle className="mr-2" /> Create Admission
                    </Link>

              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
