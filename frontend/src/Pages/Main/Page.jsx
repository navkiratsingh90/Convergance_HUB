import { Outdent } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router'
import Navbar5 from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useSelector } from 'react-redux'

const Page = () => {
	const darkMode = useSelector((state) => state.Theme.darkMode)
	return (
		<>
		<div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
     
		<Navbar5/>
			<Outlet/>
			<Footer/>
			</div>
		</>
	)
}

export default Page