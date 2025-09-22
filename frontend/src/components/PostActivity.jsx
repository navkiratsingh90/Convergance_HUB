import React from 'react'
import { useSelector } from 'react-redux'

const PostActivity = () => {
	const darkMode = useSelector((state) => state.Theme.darkMode)
	return (
		<>
			<div 
          // onClick={() => setShowNewPostModal(true)}//
          className={`mb-8 p-4 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors`}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4">
              <span className="text-white font-bold">AJ</span>
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Share something with your network...</p>
          </div>
        </div>
		</>
	)
}

export default PostActivity