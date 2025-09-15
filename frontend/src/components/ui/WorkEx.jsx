import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme } from "../../Features/ThemeSlice";

const WorkExperience = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Tech Innovations Inc.",
      role: "Senior Frontend Developer",
      duration: "Jan 2021 - Present",
      location: "San Francisco, CA (Remote)",
      description: "Lead frontend development for the company's flagship SaaS product. Implemented modern React architecture, improved performance by 40%, and mentored junior developers.",
      certifications: [
        { name: "React Professional", issuer: "Meta" },
        { name: "Advanced CSS", issuer: "Udemy" }
      ],
      logo: "🚀"
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      role: "Frontend Engineer",
      duration: "Mar 2018 - Dec 2020",
      location: "New York, NY",
      description: "Developed responsive web applications for Fortune 500 clients. Collaborated with UX designers to implement pixel-perfect interfaces and built reusable component libraries.",
      certifications: [
        { name: "JavaScript Algorithms", issuer: "FreeCodeCamp" }
      ],
      logo: "💼"
    }
  ]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    description: "",
    certifications: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExperience = {
      id: experiences.length + 1,
      company: formData.company,
      role: formData.role,
      duration: formData.duration,
      location: formData.location,
      description: formData.description,
      certifications: formData.certifications.split(',').map(cert => {
        const [name, issuer] = cert.split('|');
        return { name: name.trim(), issuer: issuer?.trim() || "Issuer" };
      }),
      logo: "⭐"
    };
    
    setExperiences([...experiences, newExperience]);
    setFormData({
      company: "",
      role: "",
      duration: "",
      location: "",
      description: "",
      certifications: ""
    });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Work Experience</h1>
            <p className={`mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Professional journey and achievements</p>
          </div>
          <button
            onClick={() => dispatch(handleTheme())}
            className={`p-3 rounded-full ${darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 top-0 h-full w-1 ${darkMode ? 'bg-blue-700' : 'bg-blue-300'} -z-10`}></div>
          
          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div key={exp.id} className="flex mb-12">
              {/* Timeline indicator */}
              <div className="flex-shrink-0 mr-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white font-bold`}>
                  {exp.logo}
                </div>
              </div>
              
              {/* Content */}
              <div className={`flex-1 rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.company}</h2>
                      <p className={`text-lg mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{exp.role}</p>
                    </div>
                    <div className={`text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p className="font-medium">{exp.duration}</p>
                      <p className="text-sm">{exp.location}</p>
                    </div>
                  </div>
                  
                  <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
                  
                  {/* Certifications */}
                  {exp.certifications && exp.certifications.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.certifications.map((cert, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {cert.name} ({cert.issuer})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Footer with position indicator */}
                <div className={`px-6 py-3 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-sm font-medium`}>
                  {index === 0 ? 'Current Position' : `Previous Position #${index}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-12 flex justify-center">
          <div 
            onClick={() => setShowForm(true)}
            className={`cursor-pointer border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${
              darkMode ? 'border-blue-700 hover:bg-blue-900/20' : 'border-blue-400 hover:bg-blue-50'
            }`}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              darkMode ? 'bg-blue-800' : 'bg-blue-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Add Work Experience</h3>
            <p className={`mt-1 text-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Click here to add a new work experience to your profile
            </p>
          </div>
        </div>
      </div>
			{showForm && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div
      className={`relative rounded-2xl shadow-lg w-full max-w-lg sm:max-w-md 
        ${darkMode ? 'bg-gray-800' : 'bg-white'} 
        max-h-[90vh] overflow-y-auto`}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-700 sticky top-0 bg-inherit rounded-t-2xl">
        <h2
          className={`text-xl sm:text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Add Work Experience
        </h2>
        <p
          className={`mt-1 text-sm sm:text-base ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Fill in your work experience details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        {/* Company Name */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {/* Role/Position */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Role/Position
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Duration (e.g., Jan 2021 - Present)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
            required
          ></textarea>
        </div>

        {/* Certifications */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Certifications (Format: Name | Issuer, separated by commas)
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            placeholder="React Professional | Meta, Advanced CSS | Udemy"
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base 
              ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-800'}`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base transition 
              ${darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add Experience
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default WorkExperience;