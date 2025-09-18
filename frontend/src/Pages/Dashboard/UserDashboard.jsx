import React from 'react'
import Sidebar from '../../components/ui/Sidebar'
import {Outlet} from 'react-router-dom'

const UserDashboard = () => {
	return (
		<>
			<div className="flex text-gray-100 min-h-screen">
			<Sidebar/>
			<div className=" flex-1 min-h-screen w-full lg:ml-72 ">
			<Outlet/>
      </div>
			</div>
		</>
	)
}

export default UserDashboard