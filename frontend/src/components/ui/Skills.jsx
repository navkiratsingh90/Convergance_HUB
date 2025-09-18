import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme } from "../../Features/ThemeSlice";

const SkillsPage = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode)
  const [activeCategory, setActiveCategory] = useState("frontend");
	const dispatch = useDispatch()
  const skillsData = {
    frontend: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "JavaScript", level: 90, icon: "📜" },
      { name: "TypeScript", level: 85, icon: "🔷" },
      { name: "HTML/CSS", level: 92, icon: "🎨" },
      { name: "Tailwind CSS", level: 88, icon: "💨" },
      { name: "Vue.js", level: 75, icon: "🟢" }
    ],
    backend: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "Express.js", level: 82, icon: "🚂" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "PostgreSQL", level: 78, icon: "🐘" },
      { name: "GraphQL", level: 75, icon: "📊" }
    ],
    tools: [
      { name: "Git", level: 90, icon: "📝" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Figma", level: 85, icon: "🎨" },
      { name: "Webpack", level: 80, icon: "📦" },
      { name: "Jest", level: 85, icon: "🃏" }
    ],
    soft: [
      { name: "Problem Solving", level: 95, icon: "🧩" },
      { name: "Team Collaboration", level: 90, icon: "👥" },
      { name: "Communication", level: 88, icon: "💬" },
      { name: "Project Management", level: 82, icon: "📊" },
      { name: "Adaptability", level: 90, icon: "🔄" },
      { name: "Creativity", level: 85, icon: "🎨" }
    ]
  };

  const categories = [
    { id: "frontend", name: "Frontend", icon: "💻" },
    { id: "backend", name: "Backend", icon: "⚙️" },
    { id: "tools", name: "Tools", icon: "🛠️" },
    { id: "soft", name: "Soft Skills", icon: "🌟" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[var(--color-darkBlue)]' : 'bg-[var(--color-white)]'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Skills & Expertise</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>My technical proficiencies and abilities</p>
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

        {/* Category Navigation */}
        <div className={`rounded-xl p-4 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Skill Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id 
                    ? `${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'} shadow-inner` 
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData[activeCategory].map((skill, index) => (
            <div key={index} className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{skill.icon}</span>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{skill.name}</h3>
                  </div>
                  <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{skill.level}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                
                {/* Proficiency Level Text */}
                <div className="flex justify-between mt-2 text-xs">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Beginner</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Intermediate</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Advanced</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <div className={`rounded-xl shadow-lg overflow-hidden mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Additional Technologies</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Redux", icon: "🔄" },
                { name: "Sass", icon: "🎀" },
                { name: "Next.js", icon: "⏭️" },
                { name: "Firebase", icon: "🔥" },
                { name: "Redis", icon: "🧠" },
                { name: "Jenkins", icon: "🤖" },
                { name: "Kubernetes", icon: "☸️" },
                { name: "Three.js", icon: "✨" }
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className={`rounded-xl shadow-lg overflow-hidden mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Certifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "AWS Certified Developer",
                  issuer: "Amazon Web Services",
                  date: "2023",
                  icon: "☁️"
                },
                {
                  title: "React Professional",
                  issuer: "Meta",
                  date: "2022",
                  icon: "⚛️"
                },
                {
                  title: "JavaScript Algorithms",
                  issuer: "FreeCodeCamp",
                  date: "2021",
                  icon: "📜"
                },
                {
                  title: "Node.js Certified Developer",
                  issuer: "OpenJS Foundation",
                  date: "2021",
                  icon: "🟢"
                }
              ].map((cert, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-blue-200 bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">{cert.icon}</span>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cert.title}</h3>
                      <p className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{cert.issuer}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Issued: {cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;