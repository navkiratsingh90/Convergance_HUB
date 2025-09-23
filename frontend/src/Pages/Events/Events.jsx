import React, { useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../../components/EventCard";

const EventsPage = () => {
  // const [darkMode, setDarkMode] = useState(true);
	const darkMode = useSelector(state => state.Theme.darkMode)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Hackathon 2025",
      description: "Join us for a 48-hour hackathon focused on artificial intelligence and machine learning. Build innovative solutions, network with industry experts, and win amazing prizes!",
      type: "Hackathon",
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      startTime: "09:00",
      endTime: "18:00",
      location: {
        type: "offline",
        venue: "Tech Innovation Center",
        address: "123 AI Street, San Francisco, CA 94105",
        mapLink: "https://maps.google.com/?q=Tech+Innovation+Center+San+Francisco"
      },
      organizer: {
        name: "AI Developers Community",
        email: "events@aidevcommunity.com",
        website: "https://aidevcommunity.com",
        linkedin: "https://linkedin.com/company/aidevcommunity"
      },
      tags: ["AI", "Machine Learning", "Python", "Data Science"],
      registrationLink: "https://aidevcommunity.com/hackathon2025",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      capacity: 200,
      price: 0,
      attendees: 147,
      createdAt: "2024-12-01"
    },
    {
      id: 2,
      title: "React Advanced Workshop",
      description: "Deep dive into advanced React patterns, performance optimization, and state management. Hands-on coding sessions with expert instructors.",
      type: "Workshop",
      startDate: "2025-02-20",
      endDate: "2025-02-20",
      startTime: "10:00",
      endTime: "17:00",
      location: {
        type: "online",
        platform: "Zoom",
        link: "https://zoom.us/j/123456789"
      },
      organizer: {
        name: "React Masters",
        email: "workshops@reactmasters.com",
        website: "https://reactmasters.com",
        linkedin: "https://linkedin.com/company/reactmasters"
      },
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
      registrationLink: "https://reactmasters.com/advanced-workshop",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      capacity: 50,
      price: 49,
      attendees: 38,
      createdAt: "2024-11-15"
    },
    {
      id: 3,
      title: "Cloud Computing Conference",
      description: "Annual conference featuring talks from cloud experts, hands-on labs, and networking opportunities. Covering AWS, Azure, and Google Cloud platforms.",
      type: "Conference",
      startDate: "2025-04-10",
      endDate: "2025-04-12",
      startTime: "08:30",
      endTime: "19:00",
      location: {
        type: "offline",
        venue: "Convention Center",
        address: "456 Cloud Avenue, Seattle, WA 98101",
        mapLink: "https://maps.google.com/?q=Seattle+Convention+Center"
      },
      organizer: {
        name: "Cloud Professionals Association",
        email: "info@cloudpros.org",
        website: "https://cloudpros.org",
        linkedin: "https://linkedin.com/company/cloudpros"
      },
      tags: ["Cloud", "AWS", "Azure", "DevOps", "Kubernetes"],
      registrationLink: "https://cloudpros.org/conference2025",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      capacity: 500,
      price: 299,
      attendees: 423,
      createdAt: "2024-12-10"
    }
  ]);

  // Filter and sort states
  const [filters, setFilters] = useState({
    eventType: "all",
    locationType: "all",
    priceType: "all",
    searchQuery: ""
  });
  
  const [sortBy, setSortBy] = useState("dateNewest");
  const [showFilters, setShowFilters] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "Workshop",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    locationType: "online",
    venue: "",
    address: "",
    mapLink: "",
    onlinePlatform: "Zoom",
    onlineLink: "",
    organizerName: "",
    organizerEmail: "",
    organizerWebsite: "",
    organizerLinkedin: "",
    tags: "",
    registrationLink: "",
    imageUrl: "",
    capacity: "",
    price: "0"
  });

  // Filter and sort events
  const filteredAndSortedEvents = events
    .filter(event => {
      // Event type filter
      if (filters.eventType !== "all" && event.type !== filters.eventType) {
        return false;
      }
      
      // Location type filter
      if (filters.locationType !== "all" && event.location.type !== filters.locationType) {
        return false;
      }
      
      // Price type filter
      if (filters.priceType === "free" && event.price > 0) {
        return false;
      }
      if (filters.priceType === "paid" && event.price === 0) {
        return false;
      }
      
      // Search query filter
      if (filters.searchQuery && !event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !event.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dateNewest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "dateOldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "titleAZ":
          return a.title.localeCompare(b.title);
        case "titleZA":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.locationType === 'online' ? {
        type: "online",
        platform: newEvent.onlinePlatform,
        link: newEvent.onlineLink
      } : {
        type: "offline",
        venue: newEvent.venue,
        address: newEvent.address,
        mapLink: newEvent.mapLink
      },
      organizer: {
        name: newEvent.organizerName,
        email: newEvent.organizerEmail,
        website: newEvent.organizerWebsite,
        linkedin: newEvent.organizerLinkedin
      },
      tags: newEvent.tags.split(',').map(tag => tag.trim()),
      registrationLink: newEvent.registrationLink,
      imageUrl: newEvent.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      capacity: parseInt(newEvent.capacity),
      price: parseFloat(newEvent.price),
      attendees: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setEvents([event, ...events]);
    setShowCreateModal(false);
    setNewEvent({
      title: "",
      description: "",
      type: "Workshop",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      locationType: "online",
      venue: "",
      address: "",
      mapLink: "",
      onlinePlatform: "Zoom",
      onlineLink: "",
      organizerName: "",
      organizerEmail: "",
      organizerWebsite: "",
      organizerLinkedin: "",
      tags: "",
      registrationLink: "",
      imageUrl: "",
      capacity: "",
      price: "0"
    });
  };

  const handleDeleteEvent = (eventId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== eventId));
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent(null);
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
      eventType: "all",
      locationType: "all",
      priceType: "all",
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

  const getEventTypeColor = (type) => {
    const colors = {
      Hackathon: "bg-purple-500",
      Workshop: "bg-blue-500",
      Conference: "bg-green-500",
      Meetup: "bg-orange-500",
      Webinar: "bg-red-500"
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tech Events</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Discover and join amazing developer events</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filters
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              Create Event
            </button>
            
          </div>
        </header>

        {/* Filter & Sort Sidebar */}
        {showFilters && (
          <div className={`mb-6 rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filters & Sort</h2>
              <button 
                onClick={clearAllFilters}
                className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Search Events
                </label>
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                  placeholder="Search by title, description, tags..."
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                />
              </div>
              
              {/* Event Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Event Type
                </label>
                <select
                  value={filters.eventType}
                  onChange={(e) => handleFilterChange("eventType", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                >
                  <option value="all">All Types</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Webinar">Webinar</option>
                </select>
              </div>
              
              {/* Location Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </label>
                <select
                  value={filters.locationType}
                  onChange={(e) => handleFilterChange("locationType", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                >
                  <option value="all">All Locations</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              
              {/* Price Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price
                </label>
                <select
                  value={filters.priceType}
                  onChange={(e) => handleFilterChange("priceType", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="mt-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sort By
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "dateNewest", label: "Newest First" },
                  { value: "dateOldest", label: "Oldest First" },
                  { value: "priceLowHigh", label: "Price: Low to High" },
                  { value: "priceHighLow", label: "Price: High to Low" },
                  { value: "titleAZ", label: "Title: A-Z" },
                  { value: "titleZA", label: "Title: Z-A" }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1 rounded-full text-sm ${sortBy === option.value 
                      ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white' 
                      : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.eventType !== "all" && (
                <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                  Type: {filters.eventType}
                </span>
              )}
              {filters.locationType !== "all" && (
                <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                  Location: {filters.locationType}
                </span>
              )}
              {filters.priceType !== "all" && (
                <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                  Price: {filters.priceType}
                </span>
              )}
              {filters.searchQuery && (
                <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'}`}>
                  Search: "{filters.searchQuery}"
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredAndSortedEvents.length} of {events.length} events
        </div>

        {/* Events Grid */}
        <EventCard filteredAndSortedEvents={filteredAndSortedEvents} getEventTypeColor={getEventTypeColor} formatDate={formatDate}/>

        {/* Empty State */}
        {filteredAndSortedEvents.length === 0 && (
          <div className={`rounded-2xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No Events Found</h2>
            <p className={`mb-8 max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {events.length === 0 
                ? "There are no events scheduled at the moment. Check back later or create your own event!"
                : "No events match your current filters. Try adjusting your search criteria."
              }
            </p>
            {events.length === 0 ? (
              <button 
                onClick={() => setShowCreateModal(true)}
                className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Create Your First Event
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

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="relative">
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Delete Button in Modal */}
              <button
                onClick={(e) => {
                  handleDeleteEvent(selectedEvent.id, e);
                  setSelectedEvent(null);
                }}
                className={`absolute top-4 right-16 p-2 rounded-full ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                title="Delete Event"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getEventTypeColor(selectedEvent.type)}`}>
                    {selectedEvent.type}
                  </span>
                  <h2 className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedEvent.title}</h2>
                </div>
                <span className={`text-lg font-bold ${selectedEvent.price === 0 ? 'text-green-500' : darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedEvent.price === 0 ? 'FREE' : `$${selectedEvent.price}`}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Date & Time</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {formatDate(selectedEvent.startDate)} {selectedEvent.startDate !== selectedEvent.endDate && `to ${formatDate(selectedEvent.endDate)}`}
                    <br />
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </p>
                </div>
                
                <div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedEvent.location.type === 'online' ? (
                      <>
                        Online via {selectedEvent.location.platform}
                        <br />
                        <a href={selectedEvent.location.link} className="text-blue-500 hover:underline">{selectedEvent.location.link}</a>
                      </>
                    ) : (
                      <>
                        {selectedEvent.location.venue}
                        <br />
                        {selectedEvent.location.address}
                        <br />
                        <a href={selectedEvent.location.mapLink} className="text-blue-500 hover:underline">View on Map</a>
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Description</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Organizer</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedEvent.organizer.name}
                    <br />
                    Email: <a href={`mailto:${selectedEvent.organizer.email}`} className="text-blue-500 hover:underline">{selectedEvent.organizer.email}</a>
                    <br />
                    Website: <a href={selectedEvent.organizer.website} className="text-blue-500 hover:underline">{selectedEvent.organizer.website}</a>
                  </p>
                </div>
                
                <div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Event Details</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Capacity: {selectedEvent.capacity} attendees
                    <br />
                    Currently registered: {selectedEvent.attendees}
                    <br />
                    Tags: {selectedEvent.tags.join(', ')}
                    <br />
                    Created: {formatDate(selectedEvent.createdAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <a 
                  href={selectedEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  Register for Event
                </a>
                <button
                  onClick={(e) => {
                    handleDeleteEvent(selectedEvent.id, e);
                    setSelectedEvent(null);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal - Remains the same as before */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 border-b border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create New Event</h2>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill in the details for your event</p>
            </div>
            
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
              {/* ... (rest of the create event form remains the same) ... */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;