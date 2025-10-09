import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const ProjectCollabPage = () => {
  const darkMode = useSelector(state => state.Theme.darkMode);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Code Assistant",
      description: "An intelligent code completion tool that uses machine learning to suggest code snippets and detect bugs in real-time. The project aims to help developers write better code faster.",
      problemStatement: "Developers often waste time on repetitive coding tasks and debugging. This tool will automate code suggestions and error detection.",
      category: "AI/ML",
      techStack: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
      status: "Looking for team members",
      requirements: ["ML Engineer", "Frontend Dev", "Backend Dev"],
      membersNeeded: 3,
      currentTeamMembers: [
        { name: "Alex Chen", email: "alex@example.com", role: "Project Lead", avatar: "alex", joinedDate: "2024-01-10" },
        { name: "Sarah Kim", email: "sarah@example.com", role: "UI/UX Designer", avatar: "sarah", joinedDate: "2024-01-12" }
      ],
      postedBy: "Alex Chen",
      datePosted: "2024-01-15",
      lastUpdated: "2024-01-20",
      contact: "alex@example.com",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      projectTimeline: "3-6 months",
      difficulty: "Intermediate",
      repositoryUrl: "https://github.com/example/ai-code-assistant",
      communicationTools: ["Slack", "Discord", "GitHub Projects"]
    },
    {
      id: 2,
      title: "Decentralized Voting System",
      description: "A blockchain-based voting platform that ensures transparency and security in electoral processes using smart contracts.",
      problemStatement: "Traditional voting systems lack transparency and are vulnerable to fraud. Blockchain can provide immutable, transparent records.",
      category: "Blockchain",
      techStack: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      status: "In progress",
      requirements: ["Blockchain Dev", "Frontend Dev", "Security Expert"],
      membersNeeded: 2,
      currentTeamMembers: [
        { name: "Mike Ross", email: "mike@example.com", role: "Blockchain Lead", avatar: "mike", joinedDate: "2024-01-05" },
        { name: "Emma Watson", email: "emma@example.com", role: "Frontend Dev", avatar: "emma", joinedDate: "2024-01-08" }
      ],
      postedBy: "Mike Ross",
      datePosted: "2024-01-10",
      lastUpdated: "2024-01-18",
      contact: "mike@example.com",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      projectTimeline: "4-8 months",
      difficulty: "Advanced",
      repositoryUrl: "https://github.com/example/decentralized-voting",
      communicationTools: ["Discord", "Trello", "GitLab"]
    },
    {
      id: 3,
      title: "Smart Home IoT Hub",
      description: "A centralized IoT hub that connects and manages all smart home devices with advanced automation and energy optimization features.",
      problemStatement: "Smart home devices often work in silos. This hub will unify control and enable cross-device automation.",
      category: "IoT",
      techStack: ["C++", "Python", "React Native", "AWS IoT", "MQTT"],
      status: "Looking for team members",
      requirements: ["IoT Engineer", "Mobile Dev", "Backend Dev", "Hardware Engineer"],
      membersNeeded: 4,
      currentTeamMembers: [
        { name: "David Lee", email: "david@example.com", role: "IoT Specialist", avatar: "david", joinedDate: "2024-01-20" }
      ],
      postedBy: "David Lee",
      datePosted: "2024-01-22",
      lastUpdated: "2024-01-22",
      contact: "david@example.com",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      projectTimeline: "6-12 months",
      difficulty: "Advanced",
      repositoryUrl: "https://github.com/example/smart-home-hub",
      communicationTools: ["Slack", "Jira", "GitHub"]
    },
    {
      id: 4,
      title: "Health Fitness Tracker Pro",
      description: "A comprehensive mobile app that tracks fitness metrics, provides personalized workout plans, and integrates with wearable devices.",
      problemStatement: "Existing fitness apps lack personalized AI-driven recommendations and seamless wearable integration.",
      category: "App Dev",
      techStack: ["React Native", "Firebase", "Node.js", "Python", "TensorFlow Lite"],
      status: "Completed",
      requirements: ["Mobile Dev", "Backend Dev", "ML Engineer", "UI/UX Designer"],
      membersNeeded: 0,
      currentTeamMembers: [
        { name: "Lisa Wang", email: "lisa@example.com", role: "Lead Developer", avatar: "lisa", joinedDate: "2024-01-01" },
        { name: "Tom Brown", email: "tom@example.com", role: "ML Engineer", avatar: "tom", joinedDate: "2024-01-03" },
        { name: "Maria Garcia", email: "maria@example.com", role: "Mobile Dev", avatar: "maria", joinedDate: "2024-01-05" }
      ],
      postedBy: "Lisa Wang",
      datePosted: "2024-01-05",
      lastUpdated: "2024-01-25",
      contact: "lisa@example.com",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      projectTimeline: "5 months",
      difficulty: "Intermediate",
      repositoryUrl: "https://github.com/example/fitness-tracker",
      communicationTools: ["Slack", "Asana", "GitHub"]
    }
  ]);

  // Filter and sort states
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    requirements: "all",
    difficulty: "all",
    searchQuery: ""
  });
  
  const [sortBy, setSortBy] = useState("dateNewest");

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    problemStatement: "",
    category: "AI/ML",
    techStack: "",
    status: "Looking for team members",
    requirements: "",
    membersNeeded: "",
    postedBy: "",
    contact: "",
    imageUrl: "",
    projectTimeline: "",
    difficulty: "Intermediate",
    repositoryUrl: "",
    communicationTools: ""
  });

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => {
      // Category filter
      if (filters.category !== "all" && project.category !== filters.category) {
        return false;
      }
      
      // Status filter
      if (filters.status !== "all" && project.status !== filters.status) {
        return false;
      }
      
      // Requirements filter
      if (filters.requirements !== "all" && !project.requirements.includes(filters.requirements)) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty !== "all" && project.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Search query filter
      if (filters.searchQuery && 
          !project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !project.techStack.some(tech => tech.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dateNewest":
          return new Date(b.datePosted) - new Date(a.datePosted);
        case "dateOldest":
          return new Date(a.datePosted) - new Date(b.datePosted);
        case "titleAZ":
          return a.title.localeCompare(b.title);
        case "titleZA":
          return b.title.localeCompare(a.title);
        case "membersNeeded":
          return b.membersNeeded - a.membersNeeded;
        case "difficulty":
          const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        default:
          return 0;
      }
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      problemStatement: newProject.problemStatement,
      category: newProject.category,
      techStack: newProject.techStack.split(',').map(tech => tech.trim()),
      status: newProject.status,
      requirements: newProject.requirements.split(',').map(req => req.trim()),
      membersNeeded: parseInt(newProject.membersNeeded),
      currentTeamMembers: [],
      postedBy: newProject.postedBy,
      datePosted: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      contact: newProject.contact,
      imageUrl: newProject.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      projectTimeline: newProject.projectTimeline,
      difficulty: newProject.difficulty,
      repositoryUrl: newProject.repositoryUrl,
      communicationTools: newProject.communicationTools.split(',').map(tool => tool.trim())
    };
    
    setProjects([project, ...projects]);
    setShowCreateModal(false);
    setNewProject({
      title: "",
      description: "",
      problemStatement: "",
      category: "AI/ML",
      techStack: "",
      status: "Looking for team members",
      requirements: "",
      membersNeeded: "",
      postedBy: "",
      contact: "",
      imageUrl: "",
      projectTimeline: "",
      difficulty: "Intermediate",
      repositoryUrl: "",
      communicationTools: ""
    });
  };

  const handleDeleteProject = (projectId, e) => {
    e?.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(project => project.id !== projectId));
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null);
      }
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      requirements: "all",
      difficulty: "all",
      searchQuery: ""
    });
    setSortBy("dateNewest");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      "Looking for team members": "bg-green-500",
      "In progress": "bg-blue-500",
      "Completed": "bg-gray-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "AI/ML": "bg-purple-500",
      "Web Dev": "bg-blue-500",
      "Blockchain": "bg-orange-500",
      "IoT": "bg-green-500",
      "App Dev": "bg-red-500"
    };
    return colors[category] || "bg-gray-500";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Beginner": "bg-green-500",
      "Intermediate": "bg-yellow-500",
      "Advanced": "bg-red-500"
    };
    return colors[difficulty] || "bg-gray-500";
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Collaboration Hub</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Find your next project team and build amazing things together</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' 
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
                  : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' 
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
                  : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              Create Project
            </button>
          </div>
        </header>

        <div className="flex gap-8">
          {/* Fixed Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filters & Sort</h2>
                  <button 
                    onClick={clearAllFilters}
                    className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Search Projects
                    </label>
                    <input
                      type="text"
                      value={filters.searchQuery}
                      onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                      placeholder="Search by title, description, tech..."
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                      <option value="all">All Categories</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Web Dev">Web Development</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="IoT">IoT</option>
                      <option value="App Dev">App Development</option>
                    </select>
                  </div>
                  
                  {/* Status Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                      <option value="all">All Status</option>
                      <option value="Looking for team members">Looking for Members</option>
                      <option value="In progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  {/* Requirements Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Roles Needed
                    </label>
                    <select
                      value={filters.requirements}
                      onChange={(e) => handleFilterChange("requirements", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                      <option value="all">All Roles</option>
                      <option value="Frontend Dev">Frontend Developer</option>
                      <option value="Backend Dev">Backend Developer</option>
                      <option value="ML Engineer">ML Engineer</option>
                      <option value="Blockchain Dev">Blockchain Developer</option>
                      <option value="Mobile Dev">Mobile Developer</option>
                      <option value="Designer">UI/UX Designer</option>
                      <option value="IoT Engineer">IoT Engineer</option>
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Difficulty Level
                    </label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                      <option value="dateNewest">Newest First</option>
                      <option value="dateOldest">Oldest First</option>
                      <option value="titleAZ">Title: A-Z</option>
                      <option value="titleZA">Title: Z-A</option>
                      <option value="membersNeeded">Most Members Needed</option>
                      <option value="difficulty">Difficulty Level</option>
                    </select>
                  </div>
                </div>
                
                {/* Active Filters Display */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.category !== "all" && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        Category: {filters.category}
                      </span>
                    )}
                    {filters.status !== "all" && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                        Status: {filters.status}
                      </span>
                    )}
                    {filters.requirements !== "all" && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                        Role: {filters.requirements}
                      </span>
                    )}
                    {filters.difficulty !== "all" && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                        Difficulty: {filters.difficulty}
                      </span>
                    )}
                    {filters.searchQuery && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'}`}>
                        Search: "{filters.searchQuery}"
                      </span>
                    )}
                    {filters.category === "all" && filters.status === "all" && filters.requirements === "all" && filters.difficulty === "all" && !filters.searchQuery && (
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No active filters
                      </span>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                <div className={`mt-4 pt-4 border-t border-gray-700 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="text-2xl font-bold text-blue-500">{filteredAndSortedProjects.length}</div>
                  <div className="text-sm">projects found</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Projects List */}
          <div className="flex-1 min-w-0">
            {/* Projects Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredAndSortedProjects.map(project => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="relative h-48">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {project.title}
                      </h3>
                      
                      <p className={`mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 4).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              +{project.techStack.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Team Info */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {project.currentTeamMembers.slice(0, 3).map((member, index) => (
                              <img 
                                key={index}
                                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${member.avatar}`}
                                alt={member.name}
                                className="w-8 h-8 rounded-full border-2 border-gray-800"
                              />
                            ))}
                            {project.currentTeamMembers.length > 3 && (
                              <div className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}>
                                +{project.currentTeamMembers.length - 3}
                              </div>
                            )}
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {project.currentTeamMembers.length} members
                          </span>
                        </div>
                        <span className={`text-sm font-semibold ${project.membersNeeded > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                          {project.membersNeeded > 0 ? `${project.membersNeeded} needed` : 'Team complete'}
                        </span>
                      </div>

                      {/* Project Meta */}
                      <div className="flex justify-between items-center text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Posted by {project.postedBy}
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {formatDate(project.datePosted)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredAndSortedProjects.map(project => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.01] ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Project Image */}
                        <div className="flex-shrink-0 w-48 h-32">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Project Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(project.category)}`}>
                                {project.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getDifficultyColor(project.difficulty)}`}>
                                {project.difficulty}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Posted {formatDate(project.datePosted)}
                              </div>
                            </div>
                          </div>

                          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {project.title}
                          </h3>
                          
                          <p className={`mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-4 mb-4">
                            <div>
                              <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack</h4>
                              <div className="flex flex-wrap gap-1">
                                {project.techStack.slice(0, 3).map((tech, index) => (
                                  <span 
                                    key={index}
                                    className={`px-2 py-1 rounded text-xs ${
                                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.techStack.length > 3 && (
                                  <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                    +{project.techStack.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Roles Needed</h4>
                              <div className="flex flex-wrap gap-1">
                                {project.requirements.map((req, index) => (
                                  <span 
                                    key={index}
                                    className={`px-2 py-1 rounded text-xs ${
                                      darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {req}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                  {project.currentTeamMembers.slice(0, 3).map((member, index) => (
                                    <img 
                                      key={index}
                                      src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${member.avatar}`}
                                      alt={member.name}
                                      className="w-8 h-8 rounded-full border-2 border-gray-800"
                                    />
                                  ))}
                                </div>
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {project.currentTeamMembers.length} team members
                                </span>
                              </div>
                              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Posted by: {project.postedBy}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle join project logic
                              }}
                              className={`px-6 py-2 rounded-lg font-semibold ${
                                darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              Join Project
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredAndSortedProjects.length === 0 && (
              <div className={`rounded-2xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No Projects Found</h2>
                <p className={`mb-8 max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {projects.length === 0 
                    ? "There are no projects available at the moment. Be the first to create a project!"
                    : "No projects match your current filters. Try adjusting your search criteria."
                  }
                </p>
                {projects.length === 0 ? (
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    Create Your First Project
                  </button>
                ) : (
                  <button 
                    onClick={clearAllFilters}
                    className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="relative">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  handleDeleteProject(selectedProject.id, e);
                  setSelectedProject(null);
                }}
                className={`absolute top-4 right-16 p-2 rounded-full ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                title="Delete Project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getDifficultyColor(selectedProject.difficulty)}`}>
                    {selectedProject.difficulty}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedProject.membersNeeded} members needed
                  </span>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Timeline: {selectedProject.projectTimeline}
                  </div>
                </div>
              </div>
              
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedProject.title}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Project Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Description</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{selectedProject.description}</p>
                  </div>

                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Problem Statement</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{selectedProject.problemStatement}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Roles Needed</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.requirements.map((req, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Team & Project Info */}
                <div className="space-y-6">
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Team Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex -space-x-2">
                            {selectedProject.currentTeamMembers.map((member, index) => (
                              <img 
                                key={index}
                                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${member.avatar}`}
                                alt={member.name}
                                className="w-10 h-10 rounded-full border-2 border-gray-800"
                              />
                            ))}
                          </div>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {selectedProject.currentTeamMembers.length} team members
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Team:</h4>
                        <ul className="space-y-2">
                          {selectedProject.currentTeamMembers.map((member, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${member.avatar}`}
                                  alt={member.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{member.name}</div>
                                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</div>
                                </div>
                              </div>
                              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Joined {formatDate(member.joinedDate)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Posted by:</span>
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>{selectedProject.postedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Date Posted:</span>
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>{formatDate(selectedProject.datePosted)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Last Updated:</span>
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>{formatDate(selectedProject.lastUpdated)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Contact:</span>
                        <span className="text-blue-500">{selectedProject.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Repository:</span>
                        <a href={selectedProject.repositoryUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Code
                        </a>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Communication:</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {selectedProject.communicationTools.map((tool, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <button
                      className={`w-full py-3 rounded-lg font-semibold ${
                        darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Join Project
                    </button>
                    <button
                      onClick={(e) => {
                        handleDeleteProject(selectedProject.id, e);
                        setSelectedProject(null);
                      }}
                      className={`w-full py-3 rounded-lg font-semibold ${
                        darkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      Delete Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create New Project</h2>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill in the details for your project</p>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="Enter project title"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="Describe your project"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Problem Statement
                    </label>
                    <textarea
                      name="problemStatement"
                      value={newProject.problemStatement}
                      onChange={handleInputChange}
                      rows="2"
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="What problem does this project solve?"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Category *
                      </label>
                      <select
                        name="category"
                        value={newProject.category}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      >
                        <option value="AI/ML">AI/ML</option>
                        <option value="Web Dev">Web Development</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="IoT">IoT</option>
                        <option value="App Dev">App Development</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status *
                      </label>
                      <select
                        name="status"
                        value={newProject.status}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      >
                        <option value="Looking for team members">Looking for Members</option>
                        <option value="In progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Tech Stack (comma separated) *
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      value={newProject.techStack}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="Python, React, Node.js, MongoDB"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Roles Needed (comma separated) *
                    </label>
                    <input
                      type="text"
                      name="requirements"
                      value={newProject.requirements}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="Frontend Dev, Backend Dev, ML Engineer"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Members Needed *
                      </label>
                      <input
                        type="number"
                        name="membersNeeded"
                        value={newProject.membersNeeded}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Difficulty Level
                      </label>
                      <select
                        name="difficulty"
                        value={newProject.difficulty}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Project Timeline
                    </label>
                    <input
                      type="text"
                      name="projectTimeline"
                      value={newProject.projectTimeline}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="e.g., 3-6 months"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Repository URL
                    </label>
                    <input
                      type="url"
                      name="repositoryUrl"
                      value={newProject.repositoryUrl}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="postedBy"
                      value={newProject.postedBy}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contact"
                      value={newProject.contact}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Communication Tools (comma separated)
                  </label>
                  <input
                    type="text"
                    name="communicationTools"
                    value={newProject.communicationTools}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    placeholder="Slack, Discord, Trello"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Project Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={newProject.imageUrl}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCollabPage;