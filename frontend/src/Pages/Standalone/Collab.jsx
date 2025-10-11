import React, { useState } from 'react';

const ProjectCollaboration = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showAddTeammateForm, setShowAddTeammateForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    github: '',
    resume: null,
    message: '',
    roles: []
  });
  const [teammateData, setTeammateData] = useState({
    username: '',
    role: ''
  });

  const projectData = {
    id: 1,
    title: "AI Code Assistant",
    description: "An intelligent code completion tool that uses machine learning to suggest code snippets and detect bugs in real-time. The project aims to help developers write better code faster.",
    problemStatement: "Developers often waste time on repetitive coding tasks and debugging. This tool will automate code suggestions and error detection.",
    category: "AI/ML",
    techStack: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    status: "Looking for team members",
    requirements: ["ML Engineer", "Frontend Dev", "Backend Dev"],
    totalMembers: 10,
    futureScope: "",
    currentTeamMembers: [
      { username: "Alex Chen", role: "Project Lead", avatar: "alex" },
      { username: "Sarah Kim", role: "UI/UX Designer", avatar: "sarah" }
    ],
    postedBy: "Alex Chen",
    datePosted: "2024-01-15",
    lastUpdated: "2024-01-20",
    contact: "alex@example.com",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  };

  const isLeader = true;
  const availableRoles = ["Frontend Developer", "Backend Developer", "ML Engineer", "UI/UX Designer", "DevOps Engineer", "Product Manager", "QA Engineer", "Data Scientist"];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      roles: selectedOptions
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application Data:', formData);
    alert('Application submitted successfully!');
    setShowApplyForm(false);
    setFormData({
      username: '',
      email: '',
      github: '',
      resume: null,
      message: '',
      roles: []
    });
  };

  // Add Teammate Form Handlers
  const handleTeammateInputChange = (e) => {
    const { name, value } = e.target;
    setTeammateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeammateSubmit = (e) => {
    e.preventDefault();
    console.log('New Teammate Data:', teammateData);
    // Here you would typically send the data to your backend
    alert(`Team member ${teammateData.username} added successfully as ${teammateData.role}!`);
    setShowAddTeammateForm(false);
    setTeammateData({
      username: '',
      role: ''
    });
  };

  const ApplyCollaboratorForm = () => {
    if (!showApplyForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} max-h-[90vh] overflow-hidden flex flex-col`}>
          {/* Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Apply as Collaborator</h2>
              <button
                onClick={() => setShowApplyForm(false)}
                className={`p-2 rounded-full hover:bg-opacity-20 ${
                  darkMode ? 'hover:bg-white' : 'hover:bg-gray-300'
                }`}
              >
                ✕
              </button>
            </div>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Join the {projectData.title} project team
            </p>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Username and Email */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* GitHub Link */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  GitHub Profile (Optional)
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              {/* Roles Applied */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Roles You're Applying For *
                </label>
                <select
                  multiple
                  value={formData.roles}
                  onChange={handleRoleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  size="3"
                >
                  {projectData.requirements.map((role, index) => (
                    <option 
                      key={index} 
                      value={role}
                      className={`py-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                    >
                      {role}
                    </option>
                  ))}
                </select>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hold Ctrl/Cmd to select multiple roles
                </p>
              </div>

              {/* Resume Upload */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Resume/CV *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:border-gray-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="hidden"
                    id="resume-upload"
                  />
                  <label 
                    htmlFor="resume-upload" 
                    className={`cursor-pointer block ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">📄</div>
                    <div className="font-medium text-sm">
                      {formData.resume ? formData.resume.name : 'Click to upload resume'}
                    </div>
                    <div className="text-xs mt-1">
                      PDF, DOC, DOCX up to 10MB
                    </div>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Why do you want to join this project? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Tell us about your experience, skills, and why you're interested in this project..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold border-2 transition-colors ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const AddTeammateForm = () => {
    if (!showAddTeammateForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Add Team Member</h2>
              <button
                onClick={() => setShowAddTeammateForm(false)}
                className={`p-2 rounded-full hover:bg-opacity-20 ${
                  darkMode ? 'hover:bg-white' : 'hover:bg-gray-300'
                }`}
              >
                ✕
              </button>
            </div>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add a new member to your project team
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddTeammateSubmit} className="p-6 space-y-6">
            {/* Username */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={teammateData.username}
                onChange={handleTeammateInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter team member's username"
              />
            </div>

            {/* Role */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Role *
              </label>
              <select
                name="role"
                value={teammateData.role}
                onChange={handleTeammateInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select a role</option>
                {availableRoles.map((role, index) => (
                  <option 
                    key={index} 
                    value={role}
                    className={`py-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Member Preview */}
            {/* {teammateData.username && teammateData.role && (
              <div className={`p-4 rounded-lg border-2 ${
                darkMode ? 'border-blue-600 bg-blue-900 bg-opacity-20' : 'border-blue-400 bg-blue-50'
              }`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  Team Member Preview
                </h3>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    darkMode ? 'bg-blue-800' : 'bg-blue-100'
                  }`}>
                    {teammateData.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{teammateData.username}</div>
                    <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {teammateData.role}
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddTeammateForm(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold border-2 transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!teammateData.username || !teammateData.role}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  !teammateData.username || !teammateData.role
                    ? 'bg-gray-400 cursor-not-allowed'
                    : darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Add to Team
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Header with Theme Toggle */}
      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">CollabHub</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Project Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img 
            src={projectData.imageUrl} 
            alt="AI Code Assistant" 
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{projectData.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}>
                  {projectData.category}
                </span>
              </div>
              
              {/* Status Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                projectData.status === 'Looking for team members' 
                  ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                  : (darkMode ? 'bg-gray-700' : 'bg-gray-200')
              }`}>
                <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                {projectData.status}
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">About the Project</h2>
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {projectData.description}
              </p>
            </section>

            {/* Problem Statement */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {projectData.problemStatement}
                </p>
              </div>
            </section>

            {/* Requirements Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Requirements</h2>
              
              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-2 rounded-lg font-medium ${
                        darkMode 
                          ? 'bg-purple-900 text-purple-200' 
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roles Needed */}
              <div>
                <h3 className="text-xl font-medium mb-3">Roles We're Looking For</h3>
                <div className="space-y-3">
                  {projectData.requirements.map((role, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg flex items-center justify-between ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } shadow-lg`}
                    >
                      <span className="font-medium">{role}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Open
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Team and Actions */}
          <div className="space-y-8">
            {/* Team Info */}
            <section className={`p-6 rounded-2xl shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
              
              <div className="mb-6">
                <div className={`p-3 rounded-lg text-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <span className="text-sm opacity-75">Total Team Size</span>
                  <div className="text-2xl font-bold text-blue-500">{projectData.totalMembers} members</div>
                </div>
              </div>

              <h3 className="text-xl font-medium mb-3">Current Team Members</h3>
              <div className="space-y-4">
                {projectData.currentTeamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      darkMode ? 'bg-blue-900' : 'bg-blue-100'
                    }`}>
                      {member.avatar.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{member.username}</div>
                      <div className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Project Leader */}
            <section className={`p-6 rounded-2xl shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-2xl font-semibold mb-4">Project Leader</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                  darkMode ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  {projectData.postedBy.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-lg">{projectData.postedBy}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Project Lead
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Posted:</span>
                  <span>{projectData.datePosted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>{projectData.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="text-blue-400">{projectData.contact}</span>
                </div>
              </div>
            </section>

            {/* Leader Actions */}
            {isLeader && (
              <section className={`p-6 rounded-2xl shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h2 className="text-2xl font-semibold mb-4">Project Management</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowAddTeammateForm(true)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    ➕ Add Team Members
                  </button>
                  <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}>
                    ✏️ Modify Requirements
                  </button>
                  <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}>
                    🗑️ Delete Project
                  </button>
                </div>
              </section>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => setShowApplyForm(true)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                🚀 Apply as Collaborator
              </button>
              
              {!isLeader && (
                <button className={`w-full py-3 px-6 rounded-xl font-semibold border-2 transition-all ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-800' 
                    : 'border-gray-300 hover:bg-gray-200'
                }`}>
                  💬 Contact Team
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Collaborator Form Popup */}
      <ApplyCollaboratorForm />

      {/* Add Teammate Form Popup */}
      <AddTeammateForm />
    </div>
  );
};

export default ProjectCollaboration;