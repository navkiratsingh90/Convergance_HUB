import React from 'react'
import { useSelector } from 'react-redux'

const EventCard = ({filteredAndSortedEvents, getEventTypeColor, formatDate}) => {
	const darkMode = useSelector((state) => state.Theme.darkMode)
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map(event => (
            <div 
              key={event.id} 
              className={`rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteEvent(event.id, e)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  title="Delete Event"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {/* Event Header */}
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.capacity - event.attendees} spots left
                  </span>
                </div>
                
                {/* Event Title */}
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</h3>
                
                {/* Event Date & Time */}
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatDate(event.startDate)} • {event.startTime}
                  </span>
                </div>
                
                {/* Location */}
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {event.location.type === 'online' ? 'Online Event' : event.location.venue}
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Price & Action */}
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${event.price === 0 ? 'text-green-500' : darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {event.price === 0 ? 'FREE' : `$${event.price}`}
                  </span>
                  <a 
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
		</>
	)
}

export default EventCard