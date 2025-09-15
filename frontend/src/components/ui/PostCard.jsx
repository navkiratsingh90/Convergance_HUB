import React from 'react'
import { useSelector } from 'react-redux'

const PostCard = ({posts}) => {
	const darkMode = useSelector((state) => state.Theme.darkMode)
	return (
		<>
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
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{post.user.username} • {post.timestamp}</p>
                  </div>
                </div>
                <button className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.content.text}</p>
                
                {post.content.media && post.content.mediaType === 'image' && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={post.content.media} 
                      alt="Post media" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                {post.content.media && post.content.mediaType === 'video' && (
                  <div className="rounded-lg overflow-hidden mb-4 bg-black">
                    <video 
                      src={post.content.media} 
                      className="w-full h-auto" 
                      controls
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
      {/* </div> */}
		</>
	)
}

export default PostCard