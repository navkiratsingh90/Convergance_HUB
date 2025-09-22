import React, { useState } from "react";

const FeedPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "AJ",
        role: "Senior Frontend Developer"
      },
      content: {
        text: "Just launched my new portfolio website! Built with React and Tailwind CSS. The performance improvements with code splitting are incredible!",
        media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mediaType: "image"
      },
      timestamp: "2 hours ago",
      likes: 42,
      comments: 7,
      isLiked: false,
      isBookmarked: false,
      isOwnPost: true
    },
    {
      id: 2,
      user: {
        name: "Sarah Williams",
        username: "sarahw",
        avatar: "SW",
        role: "Full Stack Developer"
      },
      content: {
        text: "Just released a new tutorial on advanced React patterns. Check it out on my YouTube channel! This covers the latest best practices for state management.",
        media: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mediaType: "image"
      },
      timestamp: "5 hours ago",
      likes: 128,
      comments: 23,
      isLiked: true,
      isBookmarked: false,
      isOwnPost: false
    },
    {
      id: 3,
      user: {
        name: "Mike Chen",
        username: "mikec",
        avatar: "MC",
        role: "UI/UX Designer"
      },
      content: {
        text: "Working on a new open source project - a component library for React developers. Stay tuned for the release! Would love to get some early feedback from the community.",
        media: null,
        mediaType: null
      },
      timestamp: "Yesterday",
      likes: 56,
      comments: 12,
      isLiked: false,
      isBookmarked: true,
      isOwnPost: false
    }
  ]);

  const [activeMenu, setActiveMenu] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [showNewPostModal, setShowNewPostModal] = useState(false);

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

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    setActiveMenu(null);
  };

  const handleEdit = (postId) => {
    // In a real app, this would open an edit modal
    console.log("Edit post:", postId);
    setActiveMenu(null);
  };

  const handleAddPost = () => {
    if (newPost.trim() === "") return;
    
    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "AJ",
        role: "Senior Frontend Developer"
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
      isBookmarked: false,
      isOwnPost: true
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setShowNewPostModal(false);
  };

  const trendingTopics = [
    { name: "ReactJS", posts: "12.5K" },
    { name: "TypeScript", posts: "8.7K" },
    { name: "TailwindCSS", posts: "6.3K" },
    { name: "NextJS", posts: "5.9K" },
    { name: "Web Development", posts: "15.2K" }
  ];

  const suggestedUsers = [
    { name: "Emma Davis", username: "emdavis", avatar: "ED", mutual: 12 },
    { name: "David Kim", username: "davidk", avatar: "DK", mutual: 8 },
    { name: "Lisa Wang", username: "lisaw", avatar: "LW", mutual: 15 }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Feed - Left Column */}
          <div className="lg:w-2/3">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Social Activity</h1>
                <p className={`mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Latest from your network</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
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


            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{post.user.avatar}</span>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{post.user.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          @{post.user.username} • {post.timestamp}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{post.user.role}</p>
                      </div>
                    </div>
                    
                    {/* Three Dots Menu */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === post.id ? null : post.id)}
                        className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenu === post.id && (
                        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-10`}>
                          <div className="py-1">
                            {post.isOwnPost ? (
                              <>
                                <button
                                  onClick={() => handleEdit(post.id)}
                                  className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  Edit Post
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-gray-100'}`}
                                >
                                  Delete Post
                                </button>
                              </>
                            ) : (
                              <button className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                                Report Post
                              </button>
                            )}
                            <button className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                              Share Post
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.content.text}</p>
                    
                    {post.content.media && post.content.mediaType === 'image' && (
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img 
                          src={post.content.media} 
                          alt="Post media" 
                          className="w-full h-auto object-cover max-h-96"
                        />
                      </div>
                    )}
                    
                    {/* Engagement Stats */}
                    <div className={`flex text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                      <span className="mr-4">{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>

                    {/* Engagement Buttons */}
                    <div className="flex border-t border-b border-gray-700 py-2">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${post.isLiked ? 'text-blue-500' : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Like
                      </button>
                      
                      <button className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        Comment
                      </button>
                      
                      <button 
                        onClick={() => handleBookmark(post.id)}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${post.isBookmarked ? 'text-blue-500' : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Save
                      </button>
                    </div>

                    {/* Comment Input */}
                    <div className="pt-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-bold text-sm">AJ</span>
                      </div>
                      <div className={`flex-1 rounded-full px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <input 
                          type="text" 
                          placeholder="Write a comment..." 
                          className={`w-full bg-transparent outline-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:w-1/3 space-y-6">
            {/* User Profile Card */}
            

            {/* Trending Topics */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-700">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Trending Topics</h2>
              </div>
              
              <div className="p-4 space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>#{topic.name}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-700">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Suggested Developers</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">{user.avatar}</span>
                      </div>
                      <div>
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.name}</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.mutual} mutual connections
                        </p>
                      </div>
                    </div>
                    <button className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exit/Logout Button */}
            <button className={`w-full py-3 rounded-lg font-semibold ${darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
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
  );
};

export default FeedPage;