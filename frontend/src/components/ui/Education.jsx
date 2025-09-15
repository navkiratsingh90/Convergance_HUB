import { useState } from "react";

export default function EducationPage() {
  const [darkMode] = useState(true);

  const education = [
    {
      id: 1,
      institution: "Guru Nanak Dev University",
      course: "B.Tech in Computer Science",
      duration: "2023 - 2027",
      location: "Amritsar, Punjab",
      description:
        "Studying core computer science subjects including Data Structures, Algorithms, System Software, and Machine Learning. Active in hackathons and coding societies.",
      achievements: ["Winner - Hackathon 2024", "Dean’s List 2023"],
      score: "8.7 CGPA",
      logo: "🎓",
    },
    {
      id: 2,
      institution: "DAV International School",
      course: "Higher Secondary (Science)",
      duration: "2021 - 2023",
      location: "Amritsar, Punjab",
      description:
        "Completed senior secondary education with a focus on Physics, Chemistry, and Mathematics.",
      achievements: ["Top 5% in Class XII Board Exams"],
      score: "92%",
      logo: "🏫",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Education
            </h1>
            <p
              className={`mt-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Academic journey and achievements
            </p>
          </div>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-4 top-0 h-full w-1 ${
              darkMode ? "bg-blue-700" : "bg-blue-300"
            } -z-10`}
          ></div>

          {/* Education Items */}
          {education.map((edu, index) => (
            <div key={edu.id} className="flex mb-12">
              {/* Timeline indicator */}
              <div className="flex-shrink-0 mr-6">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    darkMode ? "bg-blue-700" : "bg-blue-600"
                  } text-white text-xl`}
                >
                  {edu.logo}
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex-1 rounded-xl shadow-lg overflow-hidden ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {edu.institution}
                      </h2>
                      <p
                        className={`text-lg mt-1 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {edu.course}
                      </p>
                    </div>
                    <div
                      className={`text-right ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <p className="font-medium">{edu.duration}</p>
                      <p className="text-sm">{edu.location}</p>
                    </div>
                  </div>

                  <p
                    className={`mt-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-6">
                      <h3
                        className={`font-semibold mb-2 ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        Achievements
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((ach, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm ${
                              darkMode
                                ? "bg-blue-900 text-blue-200"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with score */}
                <div
                  className={`px-6 py-3 ${
                    darkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  } text-sm font-medium`}
                >
                  {edu.score}
                </div>
              </div>
            </div>
          ))}
        </div>
				<div className="mb-12 flex justify-center">
          <div 
            // onClick={() => setShowForm(true)}
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
              Click here to add a new education to your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
