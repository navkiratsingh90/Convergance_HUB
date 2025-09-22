import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostActivity from "./PostActivity";
import PostCard from "./PostCard";
import { handleTheme } from "../Features/ThemeSlice";

const SocialFeed = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const dispatch = useDispatch();
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "AJ"
      },
      content: {
        text: "Just launched my new portfolio website! Built with React and Tailwind CSS. Check it out and let me know what you think!",
        media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mediaType: "image"
      },
      timestamp: "2 hours ago",
      likes: 42,
      comments: 7,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      user: {
        name: "Sarah Williams",
        username: "sarahw",
        avatar: "SW"
      },
      content: {
        text: "Just released a new tutorial on advanced React patterns. Check it out on my YouTube channel!",
        media: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mediaType: "image"
      },
      timestamp: "5 hours ago",
      likes: 128,
      comments: 23,
      isLiked: true,
      isBookmarked: false
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "React Conference 2023",
      date: "Oct 15, 2023",
      time: "10:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      description: "Annual React conference featuring talks from industry experts.",
      attendees: 120,
      image: "🎪"
    },
    {
      id: 2,
      title: "Tech Networking Meetup",
      date: "Oct 22, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "Virtual Event",
      description: "Connect with developers and tech enthusiasts in our monthly virtual meetup.",
      attendees: 85,
      image: "💻"
    },
    {
      id: 3,
      title: "Open Source Workshop",
      date: "Nov 5, 2023",
      time: "1:00 PM - 4:00 PM",
      location: "New York, NY",
      description: "Learn how to contribute to open source projects effectively.",
      attendees: 65,
      image: "🔓"
    }
  ]);

  const [collaborations, setCollaborations] = useState([
    {
      id: 1,
      project: "E-Commerce Platform",
      partner: "Sarah Williams",
      status: "Completed",
      timeline: "2 months",
      role: "Frontend Developer",
      description: "Collaborated on building a full-stack e-commerce solution with React and Node.js.",
      image: "🛒"
    },
    {
      id: 2,
      project: "Health & Fitness App",
      partner: "Mike Chen",
      status: "In Progress",
      timeline: "3 months",
      role: "UI/UX Designer & Developer",
      description: "Working on a mobile app for tracking workouts and nutrition with React Native.",
      image: "💪"
    },
    {
      id: 3,
      project: "Project Management Tool",
      partner: "Digital Solutions Inc.",
      status: "Planning",
      timeline: "4 months",
      role: "Full Stack Developer",
      description: "Upcoming project to develop a custom project management solution for teams.",
      image: "📊"
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleAddPost = () => {
    if (newPost.trim() === "") return;
    
    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "AJ"
      },
      content: {
        text: newPost,
        media: null,
        mediaType: null
      },
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setShowNewPostModal(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[var(--color-darkBlue)]' : 'bg-[var(--color-white)]'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Developer Network</h1>
            <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Connect, collaborate, and grow together</p>
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
              <svg xmlns="http://www.w3.org/2000/ssvg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Social Feed */}
          <div className="lg:w-2/3">
            <PostActivity 
              darkMode={darkMode} 
              setShowNewPostModal={setShowNewPostModal} 
            />
            
            <PostCard 
              posts={posts} 
              darkMode={darkMode} 
              handleLike={handleLike} 
              handleBookmark={handleBookmark} 
            />
          </div>

          {/* Right Column - Events & Collaborations */}
          <div className="lg:w-1/3 space-y-6">
            {/* Events Section */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-700">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Events</h2>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Events you might be interested in</p>
              </div>
              
              <div className="p-4 space-y-4">
                {events.map(event => (
                  <div key={event.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className="flex items-start mb-3">
                      <span className="text-2xl mr-3">{event.image}</span>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {event.date} • {event.time}
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{event.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{event.location}</span>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`px-4 py-3 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-sm font-medium text-center cursor-pointer hover:opacity-90`}>
                View All Events
              </div>
            </div>

            {/* Collaborations Section */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-700">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Collaborations</h2>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Projects you've worked on with others</p>
              </div>
              
              <div className="p-4 space-y-4">
                {collaborations.map(collab => (
                  <div key={collab.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className="flex items-start mb-3">
                      <span className="text-2xl mr-3">{collab.image}</span>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{collab.project}</h3>
                        <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          with {collab.partner}
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{collab.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className={`px-2 py-1 rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                        {collab.role}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        collab.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 
                        collab.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' : 
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {collab.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`px-4 py-3 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-sm font-medium text-center cursor-pointer hover:opacity-90`}>
                View All Collaborations
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create Post</h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">AJ</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Alex Johnson</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@alexj</p>
                  </div>
                </div>
                
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  rows="4"
                  className={`w-full p-3 rounded-lg mb-4 outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} border`}
                ></textarea>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-3">
                    <button className={`p-2 rounded-full ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className={`p-2 rounded-full ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddPost}
                    disabled={newPost.trim() === ""}
                    className={`px-4 py-2 rounded-lg ${newPost.trim() === "" ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeed;