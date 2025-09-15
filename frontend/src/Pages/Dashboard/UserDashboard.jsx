import React from 'react'
import Sidebar from '../../components/ui/Sidebar'
import {Outlet} from 'react-router-dom'

const UserDashboard = () => {
	return (
		<>
			<div className="flex bg-gray-900 text-gray-100 min-h-screen">
			<Sidebar/>
			<div className="flex-1 min-h-screen lg:ml-72 p-6">
			<Outlet/>
      </div>
			</div>
		</>
	)
}

export default UserDashboard