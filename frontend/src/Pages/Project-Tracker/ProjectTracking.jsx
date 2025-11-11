import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectTracker = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Mock data for project
  const projectData = {
    name: "AI Code Assistant",
    description: "An intelligent code completion tool using machine learning",
    status: "In Progress",
    progress: 65,
    githubRepo: "https://github.com/team/ai-code-assistant",
    lastCommit: {
      message: "feat: Implemented real-time code suggestions",
      author: "Alex Chen",
      timestamp: "2024-01-23 14:30",
      hash: "a1b2c3d"
    },
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  };

  // Mock team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Chen", role: "Project Lead", avatar: "AC", email: "alex@example.com" },
    { id: 2, name: "Sarah Kim", role: "Frontend Developer", avatar: "SK", email: "sarah@example.com" },
    { id: 3, name: "Mike Rodriguez", role: "Backend Developer", avatar: "MR", email: "mike@example.com" },
    { id: 4, name: "Emma Wilson", role: "ML Engineer", avatar: "EW", email: "emma@example.com" },
    { id: 5, name: "James Brown", role: "UI/UX Designer", avatar: "JB", email: "james@example.com" }
  ]);

  // Mock tasks
  const [tasks, setTasks] = useState([
    { id: 1, description: "Implement real-time code suggestions", priority: "High", assignedTo: 2, status: "In Progress", dueDate: "2024-01-30" },
    { id: 2, description: "Setup ML model training pipeline", priority: "High", assignedTo: 4, status: "Completed", dueDate: "2024-01-25" },
    { id: 3, description: "Design user interface components", priority: "Medium", assignedTo: 5, status: "Completed", dueDate: "2024-01-20" },
    { id: 4, description: "Create API endpoints for code analysis", priority: "Medium", assignedTo: 3, status: "In Progress", dueDate: "2024-01-28" },
    { id: 5, description: "Write unit tests for core functionality", priority: "Low", assignedTo: 2, status: "Pending", dueDate: "2024-02-05" },
    { id: 6, description: "Document API usage", priority: "Low", assignedTo: 1, status: "Pending", dueDate: "2024-02-10" }
  ]);

  // Mock calendar events
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: "Sprint Planning", description: "Plan next sprint tasks and goals", startDate: "2024-01-25T10:00", endDate: "2024-01-25T11:30", type: "Meeting", assignedMembers: [1, 2, 3] },
    { id: 2, title: "ML Model Training Deadline", description: "Complete initial model training", startDate: "2024-01-28T23:59", endDate: "2024-01-28T23:59", type: "Deadline", assignedMembers: [4] },
    { id: 3, title: "UI/UX Review", description: "Review and provide feedback on designs", startDate: "2024-01-26T14:00", endDate: "2024-01-26T15:00", type: "Meeting", assignedMembers: [1, 5] },
    { id: 4, title: "Beta Release", description: "Release beta version for testing", startDate: "2024-02-15T00:00", endDate: "2024-02-15T00:00", type: "Milestone", assignedMembers: [1, 2, 3, 4, 5] }
  ]);

  // Project timeline stages
  const timelineStages = [
    { stage: "Planning", status: "completed", date: "2024-01-01" },
    { stage: "Design", status: "completed", date: "2024-01-10" },
    { stage: "Development", status: "current", date: "2024-01-15" },
    { stage: "Testing", status: "upcoming", date: "2024-02-01" },
    { stage: "Deployment", status: "upcoming", date: "2024-02-15" }
  ];

  // Form states
  const [taskForm, setTaskForm] = useState({ description: '', priority: 'Low', assignedTo: '', dueDate: '', status: 'Pending' });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', email: '' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', startDate: '', endDate: '', type: 'Meeting' });

  const isLeader = true; // Assuming current user is the leader

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Form handling functions
  const handleOpenForm = (type, item = null) => {
    setFormType(type);
    setEditingItem(item);
    
    if (item) {
      // Editing existing item
      if (type === 'task') setTaskForm(item);
      if (type === 'team') setTeamForm(item);
      if (type === 'event') setEventForm(item);
    } else {
      // Adding new item - reset forms
      if (type === 'task') setTaskForm({ description: '', priority: 'Low', assignedTo: '', dueDate: '', status: 'Pending' });
      if (type === 'team') setTeamForm({ name: '', role: '', email: '' });
      if (type === 'event') setEventForm({ title: '', description: '', startDate: '', endDate: '', type: 'Meeting' });
    }
    
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormType('');
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (formType === 'task') {
      if (editingItem) {
        // Update existing task
        setTasks(tasks.map(task => task.id === editingItem.id ? { ...taskForm, id: editingItem.id } : task));
      } else {
        // Add new task
        const newTask = { ...taskForm, id: tasks.length + 1 };
        setTasks([...tasks, newTask]);
      }
    }
    
    if (formType === 'team') {
      if (editingItem) {
        // Update existing team member
        setTeamMembers(teamMembers.map(member => member.id === editingItem.id ? { ...teamForm, id: editingItem.id, avatar: teamForm.name.split(' ').map(n => n[0]).join('') } : member));
      } else {
        // Add new team member
        const newMember = { 
          ...teamForm, 
          id: teamMembers.length + 1, 
          avatar: teamForm.name.split(' ').map(n => n[0]).join('')
        };
        setTeamMembers([...teamMembers, newMember]);
      }
    }
    
    if (formType === 'event') {
      if (editingItem) {
        // Update existing event
        setCalendarEvents(calendarEvents.map(event => event.id === editingItem.id ? { ...eventForm, id: editingItem.id } : event));
      } else {
        // Add new event
        const newEvent = { ...eventForm, id: calendarEvents.length + 1, assignedMembers: [] };
        setCalendarEvents([...calendarEvents, newEvent]);
      }
    }
    
    handleCloseForm();
  };

  const handleDeleteItem = (type, id) => {
    if (type === 'task') {
      setTasks(tasks.filter(task => task.id !== id));
    } else if (type === 'team') {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    } else if (type === 'event') {
      setCalendarEvents(calendarEvents.filter(event => event.id !== id));
    }
  };

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return darkMode ? 'bg-red-600' : 'bg-red-500';
      case 'Medium': return darkMode ? 'bg-yellow-600' : 'bg-yellow-500';
      case 'Low': return darkMode ? 'bg-green-600' : 'bg-green-500';
      default: return darkMode ? 'bg-gray-600' : 'bg-gray-500';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Meeting': return darkMode ? 'bg-blue-600' : 'bg-blue-500';
      case 'Deadline': return darkMode ? 'bg-red-600' : 'bg-red-500';
      case 'Milestone': return darkMode ? 'bg-purple-600' : 'bg-purple-500';
      default: return darkMode ? 'bg-gray-600' : 'bg-gray-500';
    }
  };

  const getAssignedMember = (memberId) => {
    return teamMembers.find(member => member.id === memberId);
  };

  // Form Component
  const AddFormModal = () => {
    if (!showAddForm) return null;

    const getFormTitle = () => {
      if (formType === 'task') return editingItem ? 'Edit Task' : 'Add New Task';
      if (formType === 'team') return editingItem ? 'Edit Team Member' : 'Add Team Member';
      if (formType === 'event') return editingItem ? 'Edit Event' : 'Add Calendar Event';
      return 'Add Item';
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-2xl font-bold">{getFormTitle()}</h2>
          </div>
          
          <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
            {/* Task Form */}
            {formType === 'task' && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Task Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priority
                    </label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Assign To
                    </label>
                    <select
                      value={taskForm.assignedTo}
                      onChange={(e) => setTaskForm({...taskForm, assignedTo: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    >
                      <option value="">Select Member</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Team Form */}
            {formType === 'team' && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Role
                  </label>
                  <input
                    type="text"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({...teamForm, role: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={teamForm.email}
                    onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
              </>
            )}

            {/* Event Form */}
            {formType === 'event' && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    rows="2"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Type
                  </label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.startDate}
                      onChange={(e) => setEventForm({...eventForm, startDate: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.endDate}
                      onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCloseForm}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-colors ${
                  darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {editingItem ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`w-64 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">{projectData.name}</h2>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {projectData.description}
            </p>
          </div>
          
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'tasks', label: 'Tasks', icon: '✅' },
              { id: 'team', label: 'Team', icon: '👥' },
              { id: 'calendar', label: 'Calendar', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className={`p-4 mt-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg mx-4`}>
            <h3 className="font-semibold mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Progress</span>
                <span className="font-bold text-blue-500">{projectData.progress}%</span>
              </div>
              <div className="flex justify-between">
                <span>Team Members</span>
                <span>{teamMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Tasks</span>
                <span>{tasks.filter(t => t.status !== 'Completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Upcoming Events</span>
                <span>{calendarEvents.filter(e => new Date(e.startDate) > new Date()).length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Project Overview</h2>
                <a 
                  href={projectData.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  🔗 GitHub Repository
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Progress Section */}
                <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-bold mb-4">Project Progress</h3>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Overall Completion</span>
                      <span className="font-bold">{projectData.progress}%</span>
                    </div>
                    <div className={`w-full rounded-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${projectData.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Project Timeline</h4>
                    <div className="space-y-4">
                      {timelineStages.map((stage, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-4 ${
                            stage.status === 'completed' ? 'bg-green-500' :
                            stage.status === 'current' ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-400'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${
                                stage.status === 'current' ? 'text-blue-500' : 
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {stage.stage}
                              </span>
                              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {stage.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                  
                  {/* Latest Commit */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Latest Commit</h4>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm">{projectData.lastCommit.hash}</span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {projectData.lastCommit.timestamp}
                        </span>
                      </div>
                      <p className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {projectData.lastCommit.message}
                      </p>
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
                          darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {projectData.lastCommit.author.charAt(0)}
                        </div>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {projectData.lastCommit.author}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div>
                    <h4 className="font-semibold mb-2">Current Build</h4>
                    <img 
                      src={projectData.image} 
                      alt="Project" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Project Tasks</h2>
                {isLeader && (
                  <button
                    onClick={() => handleOpenForm('task')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    + Add Task
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left p-4">Description</th>
                      <th className="text-left p-4">Priority</th>
                      <th className="text-left p-4">Assigned To</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Due Date</th>
                      {isLeader && <th className="text-left p-4">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => {
                      const assignedMember = getAssignedMember(task.assignedTo);
                      return (
                        <tr key={task.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <td className="p-4">{task.description}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            {assignedMember && (
                              <div className="flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {assignedMember.avatar}
                                </div>
                                <span>{assignedMember.name}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-4">{task.dueDate}</td>
                          {isLeader && (
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleOpenForm('task', task)}
                                  className={`px-3 py-1 rounded text-sm transition-colors ${
                                    darkMode 
                                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                  }`}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteItem('task', task.id)}
                                  className={`px-3 py-1 rounded text-sm transition-colors ${
                                    darkMode 
                                      ? 'bg-red-600 hover:bg-red-700' 
                                      : 'bg-red-500 hover:bg-red-600 text-white'
                                  }`}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Team Members</h2>
                {isLeader && (
                  <button
                    onClick={() => handleOpenForm('team')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    + Add Member
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left p-4">Avatar</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Tasks Assigned</th>
                      {isLeader && <th className="text-left p-4">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {member.avatar}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{member.name}</td>
                        <td className="p-4">{member.role}</td>
                        <td className="p-4">{member.email}</td>
                        <td className="p-4">
                          {tasks.filter(t => t.assignedTo === member.id).length}
                        </td>
                        {isLeader && (
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleOpenForm('team', member)}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                  darkMode 
                                    ? 'bg-yellow-600 hover:bg-yellow-700' 
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                              >
                                Edit
                              </button>
                              {member.role !== 'Project Lead' && (
                                <button
                                  onClick={() => handleDeleteItem('team', member.id)}
                                  className={`px-3 py-1 rounded text-sm transition-colors ${
                                    darkMode 
                                      ? 'bg-red-600 hover:bg-red-700' 
                                      : 'bg-red-500 hover:bg-red-600 text-white'
                                  }`}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className={`rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Calendar Events</h2>
                {isLeader && (
                  <button
                    onClick={() => handleOpenForm('event')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    + Add Event
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left p-4">Title</th>
                      <th className="text-left p-4">Description</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Start Date</th>
                      <th className="text-left p-4">End Date</th>
                      {isLeader && <th className="text-left p-4">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {calendarEvents.map((event) => (
                      <tr key={event.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-4 font-medium">{event.title}</td>
                        <td className="p-4">{event.description}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </td>
                        <td className="p-4">{new Date(event.startDate).toLocaleString()}</td>
                        <td className="p-4">{new Date(event.endDate).toLocaleString()}</td>
                        {isLeader && (
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleOpenForm('event', event)}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                  darkMode 
                                    ? 'bg-yellow-600 hover:bg-yellow-700' 
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteItem('event', event.id)}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                  darkMode 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      <AddFormModal />
    </div>
  );
};

export default ProjectTracker;