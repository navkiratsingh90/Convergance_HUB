import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme } from "../../Features/ThemeSlice";

const CertificationsPage = () => {
	const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.Theme.darkMode)
  const [showForm, setShowForm] = useState(false);
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2023",
      description: "Demonstrated expertise in designing distributed systems on AWS. Covered topics include high availability, security, and scalability.",
      image: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
      credentialLink: "https://www.credly.com/badges/example123",
      skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"]
    },
    {
      id: 2,
      title: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "January 2023",
      description: "Validates skills in building and deploying applications on Google Cloud Platform. Focus on cloud-native development practices.",
      image: "https://miro.medium.com/v2/resize:fit:800/1*SdT6vs2Nl5Pk0jHq4Qk0Lw.png",
      credentialLink: "https://www.credential.net/example456",
      skills: ["Google Cloud", "Cloud Development", "Kubernetes", "App Engine"]
    },
    {
      id: 3,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "November 2022",
      description: "Advanced React concepts including hooks, context API, performance optimization, and testing with Jest and React Testing Library.",
      image: "https://example.com/react-cert.png",
      credentialLink: "https://www.coursera.org/account/accomplishments/certificate/example789",
      skills: ["React", "JavaScript", "Redux", "Testing"]
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    image: "",
    credentialLink: "",
    skills: ""
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
    const newCertification = {
      id: certifications.length + 1,
      title: formData.title,
      issuer: formData.issuer,
      date: formData.date,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      credentialLink: formData.credentialLink,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };
    
    setCertifications([...certifications, newCertification]);
    setFormData({
      title: "",
      issuer: "",
      date: "",
      description: "",
      image: "",
      credentialLink: "",
      skills: ""
    });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[var(--color-darkBlue)]" : "bg-[var(--color-white)]"}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Certifications</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Professional credentials and achievements</p>
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

        
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map(cert => (
            <div key={cert.id} className={`rounded-xl shadow-lg overflow-hidden flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Certification Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex-1">
                {/* Certification Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cert.title}</h2>
                    <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{cert.issuer}</p>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cert.date}</span>
                </div>
                
                {/* Certification Description */}
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cert.description}</p>
                
                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-4">
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Skills Validated</h3>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Certification Footer */}
              
            </div>
          ))}
        </div>

        
      </div>

      {/* Add Certification Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add Certification</h2>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill in your certification details</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Certification Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Issuing Organization
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Issue Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  placeholder="Month Year"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  placeholder="https://example.com/certificate-image.png"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Credential URL
                </label>
                <input
                  type="url"
                  name="credentialLink"
                  value={formData.credentialLink}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  placeholder="https://credential.net/example"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  placeholder="Cloud Computing, Security, Networking"
                  required
                />
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
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
			{/* Add Certification Button */}
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
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Add Certification</h3>
            <p className={`mt-1 text-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Click here to add a new certification to your portfolio
            </p>
          </div>
        </div>

    </div>
  );
};

export default CertificationsPage;