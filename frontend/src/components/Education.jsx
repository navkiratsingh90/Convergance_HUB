import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme } from "../Features/ThemeSlice";

const EducationPage = () => {
  const darkMode = useSelector(state => state.Theme.darkMode)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState([
    {
      id: 1,
      institution: "Stanford University",
      degree: "Master of Science in Computer Science",
      duration: "2018 - 2020",
      grade: "3.9/4.0 GPA",
      achievements: [
        "Specialized in Artificial Intelligence and Machine Learning",
        "Published research paper on Neural Networks",
        "Teaching Assistant for Algorithms course"
      ],
      logo: "🎓"
    },
    {
      id: 2,
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Software Engineering",
      duration: "2014 - 2018",
      grade: "3.8/4.0 GPA",
      achievements: [
        "Dean's List for 6 consecutive semesters",
        "President of Computer Science Society",
        "Winner of Annual Hackathon 2017"
      ],
      logo: "🏫"
    },
    {
      id: 3,
      institution: "San Francisco High School",
      degree: "High School Diploma",
      duration: "2010 - 2014",
      grade: "94%",
      achievements: [
        "Valedictorian",
        "National Math Olympiad Winner",
        "Captain of Robotics Team"
      ],
      logo: "📚"
    }
  ]);

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    duration: "",
    grade: "",
    achievements: ""
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
    const newEducation = {
      id: education.length + 1,
      institution: formData.institution,
      degree: formData.degree,
      duration: formData.duration,
      grade: formData.grade,
      achievements: formData.achievements.split(',').map(a => a.trim()),
      logo: "🎓"
    };
    
    setEducation([newEducation, ...education]);
    setFormData({
      institution: "",
      degree: "",
      duration: "",
      grade: "",
      achievements: ""
    });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[var(--color-darkBlue)]' : 'bg-[var(--color-white)]'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Education</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Academic journey and achievements</p>
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

        {/* Add Education Button */}
        

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 top-0 h-full w-1 ${darkMode ? 'bg-blue-700' : 'bg-blue-300'} -z-10`}></div>
          
          {/* Education Items */}
          {education.map((edu, index) => (
            <div key={edu.id} className="flex mb-12">
              {/* Timeline indicator */}
              <div className="flex-shrink-0 mr-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white font-bold text-lg`}>
                  {edu.logo}
                </div>
              </div>
              
              {/* Content */}
              <div className={`flex-1 rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{edu.institution}</h2>
                      <p className={`text-lg mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{edu.degree}</p>
                    </div>
                    <div className={`text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p className="font-medium">{edu.duration}</p>
                      <p className="text-sm">{edu.grade}</p>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Achievements</h3>
                      <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Footer with degree type indicator */}
               
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        
      </div>
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
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Add Education</h3>
            <p className={`mt-1 text-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Click here to add a new education entry
            </p>
          </div>
        </div>
      {/* Add Education Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add Education</h2>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill in your education details</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Degree/Course
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Duration (e.g., 2018 - 2022)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  CGPA/Percentage
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Achievements (separated by commas)
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  placeholder="Dean's List, Research Paper Publication, Club President"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationPage;