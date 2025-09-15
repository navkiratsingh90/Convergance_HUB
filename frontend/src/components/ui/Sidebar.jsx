import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { Menu, X } from "lucide-react"; // optional if you use lucide-react icons
import WorkExperience from "./WorkEx";
import { Link } from "react-router";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("user");
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "user", title: "User Details", icon: "👤", to : '' },
    { id: "work", title: "Work Experience", icon: "💼" , to : 'work-experience' },
    { id: "education", title: "Education", icon: "🎓", to: 'education' },
    { id: "activity", title: "Activity", icon: "📊", to : 'activity' },
    { id: "projects", title: "Projects", icon: "📂", to : 'projects' },
    { id: "skills", title: "Skills", icon: "🛠️", to : 'skills' },
    { id: "certifications", title: "Certifications", icon: "🏆" , to : 'certifications' },
  ];

  return (
  <>      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 lg:hidden z-20 bg-[#38bdf8] p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f172a] shadow-2xl flex flex-col z-10 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#38bdf8] flex items-center justify-center">
              <span className="font-bold text-white text-xl">jD</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              join<span className="text-[#38bdf8]">Dev</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Developer community platform
          </p>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          {sections.map((section) => (
            <Link to={`/${section.to}`} key={section.id} className="mb-1" >
              <button
                onClick={() => {
                  setActiveSection(section.id);
                  setIsOpen(false); // close on mobile after selection
                }}
                className={`w-[90%] cursor-pointer flex items-center space-x-3 p-4 mx-2 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-[#38bdf8] text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
              </button>
            </Link>
          ))}
        </div>

        {/* Exit Button */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <span>🚪</span>
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Main Content - offset by sidebar on desktop */}
        </>
  );
};

export default Sidebar;
