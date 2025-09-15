
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import UserProfile from "./components/ui/UserDetails";
import WorkExperience from "./components/ui/WorkEx";
import EducationPage from "./components/ui/Education";
import SocialFeed from "./components/ui/SocialActivity";
import {Provider} from 'react-redux'
import { store } from "./Store/Store";
// import PopupForm from "./components/ui/PopupUserForm";

const router = createBrowserRouter([
  // { path: "/", element: <Sidebar /> },
  {
    path : '/',
    element : <UserDashboard/>,
    children : [
      {
        path : '/',
        element : <UserProfile/>
      },
      {
        path : '/work-experience',
        element : <WorkExperience/>
      },
      {
        path : '/education',
        element : <EducationPage/>
      },
      {
        path : '/activity',
        element : <SocialFeed/>
      }
    ]
  }
  // { path: "/about", element: <About /> },
])

function App() {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //  <LandingPage/>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    // </div>
  )
}

export default App
