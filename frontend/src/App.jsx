
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
import ProjectsPage from "./components/ui/Projects";
import SkillsPage from "./components/ui/Skills";
import CertificationsPage from "./components/ui/Certifications";
import HomePage from "./Pages/LandingPage";
// import PopupForm from "./components/ui/PopupUserForm";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path : '/user',
    element : <UserDashboard/>,
    children : [
      {
        path : '/user',
        element : <UserProfile/>
      },
      {
        path : '/user/work-experience',
        element : <WorkExperience/>
      },
      {
        path : '/user/education',
        element : <EducationPage/>
      },
      {
        path : '/user/activity',
        element : <SocialFeed/>
      },
      {
        path : '/user/projects',
        element : <ProjectsPage/>
      },
      {
        path : '/user/skills',
        element : <SkillsPage/>
      },
      {
        path : '/user/certifications',
        element : <CertificationsPage/>
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
