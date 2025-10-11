import React, { useState } from 'react';
import { Link } from 'react-router';

const ProjectDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('discussions');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Mock data for discussions
  const joinedDiscussions = [
    {
      id: 1,
      groupName: "AI Development Team",
      totalMembers: 24,
      lastActivity: "2 hours ago",
      unreadMessages: 3
    },
    {
      id: 2,
      groupName: "React Experts",
      totalMembers: 15,
      lastActivity: "1 day ago",
      unreadMessages: 0
    },
    {
      id: 3,
      groupName: "Backend Architecture",
      totalMembers: 18,
      lastActivity: "3 hours ago",
      unreadMessages: 1
    }
  ];

  const moreDiscussions = [
    {
      id: 1,
      groupName: "Machine Learning Enthusiasts",
      totalMembers: 156,
      onlineMembers: 23,
      members: ["user1", "user2", "user3", "user4"],
      description: "Discussing latest ML trends and projects"
    },
    {
      id: 2,
      groupName: "Full Stack Developers",
      totalMembers: 89,
      onlineMembers: 12,
      members: ["user5", "user6", "user7"],
      description: "Sharing full stack development experiences"
    },
    {
      id: 3,
      groupName: "Startup Founders",
      totalMembers: 67,
      onlineMembers: 8,
      members: ["user8", "user9", "user10", "user11", "user12"],
      description: "Networking and collaboration for startups"
    },
    {
      id: 4,
      groupName: "UI/UX Design Community",
      totalMembers: 134,
      onlineMembers: 19,
      members: ["user13", "user14", "user15"],
      description: "Design discussions and portfolio reviews"
    }
  ];

  // Mock data for collaborator requests
  const collaboratorRequests = [
    {
      id: 1,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      roles: ["Frontend Developer", "UI Developer"],
      resume: "michael_chen_resume.pdf",
      experience: "3 years",
      skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
      appliedDate: "2024-01-22",
      avatar: "MC"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      roles: ["ML Engineer"],
      resume: "sarah_johnson_cv.pdf",
      experience: "2 years",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
      appliedDate: "2024-01-21",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "David Martinez",
      email: "david.m@example.com",
      roles: ["Backend Developer", "DevOps"],
      resume: "david_martinez_resume.pdf",
      experience: "4 years",
      skills: ["Node.js", "Docker", "AWS", "MongoDB"],
      appliedDate: "2024-01-20",
      avatar: "DM"
    }
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleAcceptRequest = (requestId) => {
    alert(`Accepted collaborator request #${requestId}`);
    setShowRequestModal(false);
    // In real app, you would update the state/API here
  };

  const handleJoinDiscussion = (discussionId) => {
    alert(`Joined discussion #${discussionId}`);
    // In real app, you would update the state/API here
  };

  const CollaboratorRequestModal = () => {
    if (!showRequestModal || !selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Collaborator Request</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className={`p-2 rounded-full hover:bg-opacity-20 ${
                  darkMode ? 'hover:bg-white' : 'hover:bg-gray-300'
                }`}
              >
                ✕
              </button>
            </div>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Review application details
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Applicant Info */}
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedRequest.avatar}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedRequest.name}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {selectedRequest.email}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Applied on {selectedRequest.appliedDate}
                </p>
              </div>
            </div>

            {/* Roles Applied */}
            <div>
              <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Roles Applied For
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRequest.roles.map((role, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode 
                        ? 'bg-purple-900 text-purple-200' 
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Experience
                </h4>
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className="font-medium">{selectedRequest.experience}</p>
                </div>
              </div>

              <div>
                <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        darkMode 
                          ? 'bg-green-900 text-green-200' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume */}
            <div>
              <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Resume
              </h4>
              <div className={`p-4 rounded-lg border-2 border-dashed ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <p className="font-medium">{selectedRequest.resume}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        PDF Document
                      </p>
                    </div>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}>
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowRequestModal(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold border-2 transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Decline
              </button>
              <button
                onClick={() => handleAcceptRequest(selectedRequest.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  darkMode 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Accept Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Header */}
      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">Notifying you...</h1>
          <div className="flex items-center space-x-4">
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
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
            }`}>
              User
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'discussions', label: 'Discussions', icon: '💬' },
              { id: 'requests', label: 'Collaborator Requests', icon: '👥' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 px-2 font-semibold text-lg border-b-2 transition-colors flex items-center space-x-2 ${
                  activeSection === tab.id
                    ? darkMode
                      ? 'border-blue-500 text-blue-400'
                      : 'border-blue-500 text-blue-600'
                    : darkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === 'requests' && collaboratorRequests.length > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    darkMode ? 'bg-red-600' : 'bg-red-500 text-white'
                  }`}>
                    {collaboratorRequests.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Discussions Section */}
        {activeSection === 'discussions' && (
          <div className="space-y-8">
            {/* Joined Discussions */}
            <section className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <span>📱</span>
                  <span>Joined Discussions</span>
                </h2>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Discussions you are currently participating in
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                        darkMode 
                          ? 'border-gray-700 hover:border-blue-500' 
                          : 'border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      <h3 className="text-xl font-semibold mb-3">{discussion.groupName}</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Members
                          </span>
                          <span className="font-semibold">{discussion.totalMembers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Last Activity
                          </span>
                          <span className="text-sm">{discussion.lastActivity}</span>
                        </div>
                        {discussion.unreadMessages > 0 && (
                          <div className="flex justify-between items-center">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Unread
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              darkMode ? 'bg-red-600' : 'bg-red-500 text-white'
                            }`}>
                              {discussion.unreadMessages}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Link to={'/notifications/chat'}><button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        darkMode 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}>
                        View Discussion
                      </button></Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* More Discussions to Join */}
            <section className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <span>🔍</span>
                  <span>More Discussions</span>
                </h2>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Discover and join new discussions
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {moreDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                        darkMode 
                          ? 'border-gray-700 hover:border-green-500' 
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{discussion.groupName}</h3>
                          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {discussion.description}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        }`}>
                          {discussion.onlineMembers} online
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Total Members:
                          </span>
                          <span className="font-semibold">{discussion.totalMembers}</span>
                        </div>
                        
                        <div className="flex -space-x-2">
                          {discussion.members.map((member, index) => (
                            <div
                              key={index}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                                darkMode 
                                  ? 'bg-blue-600 border-gray-800' 
                                  : 'bg-blue-100 border-white text-blue-800'
                              }`}
                            >
                              {member.replace('user', 'U')}
                            </div>
                          ))}
                          {discussion.totalMembers > discussion.members.length && (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                              darkMode 
                                ? 'bg-gray-600 border-gray-800 text-gray-300' 
                                : 'bg-gray-200 border-white text-gray-600'
                            }`}>
                              +{discussion.totalMembers - discussion.members.length}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleJoinDiscussion(discussion.id)}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          darkMode 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        Join Discussion
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Collaborator Requests Section */}
        {activeSection === 'requests' && (
          <section className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold flex items-center space-x-3">
                <span>👥</span>
                <span>Collaborator Requests</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  darkMode ? 'bg-red-600' : 'bg-red-500 text-white'
                }`}>
                  {collaboratorRequests.length} pending
                </span>
              </h2>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Review and manage collaboration requests for your projects
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {collaboratorRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      darkMode 
                        ? 'border-gray-700 hover:border-yellow-500' 
                        : 'border-gray-200 hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {request.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{request.name}</h3>
                          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {request.email}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {request.roles.map((role, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  darkMode 
                                    ? 'bg-purple-900 text-purple-200' 
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {request.appliedDate}
                        </span>
                        <button
                          onClick={() => handleViewRequest(request)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            darkMode 
                              ? 'bg-yellow-600 hover:bg-yellow-700' 
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }`}
                        >
                          View Request
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {collaboratorRequests.length === 0 && (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
                  <p>All collaborator requests have been processed.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Collaborator Request Modal */}
      <CollaboratorRequestModal />
    </div>
  );
};

export default ProjectDashboard;