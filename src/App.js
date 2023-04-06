// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home/Home';
import Register from "./components/Register/Register";
import ErrorPage from "./components/ErrorPage/ErrorPage"
import RootLayout from "./components/RootLayout/RootLayout"
import Login from './components/Login/Login';
import SuperAdminHome from './components/SuperAdminHome/SuperAdminHome';
import AdminHome from './components/AdminHome/AdminHome';
import ProjectManagerHome from './components/ProjectManagerHome/ProjectManagerHome';
import GdoHeadHome from './components/GdoHeadHome/GdoHeadHome';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import LoginDemo from "./components/LoginDemo/LoginDemo";
import RoleNotAssignedPage from "./components/RoleNotAssignedPage/RoleNotAssignedPage";
import GetAllProjects from "./components/GetAllProjects/GetAllProjects";


function App() {
  // create browser router object
  const browserRouterObj = createBrowserRouter([
    {
      // path
      path: "/",
      // component to be loaded
      element: <RootLayout />,
      errorElement:<ErrorPage/>,
      // children of element/ RootLayout
      children: [
        {
          path: "/",               
          element: <Home />,        
        },
        {
          path: "register",         
          element: <Register />,    
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: `super-admin-home`,
          element: <SuperAdminHome/>
        },
        {
          path: `admin-home`,
          element: <AdminHome/>
        },
        {
          path: `project-manager-home`,
          element: <ProjectManagerHome/>,
        },
        {
          path: `gdo-head-home`,
          element: <GdoHeadHome/>
        },
        {
          path: `project-details/:project_id`,
          element: <ProjectDetails/>
        },
        {
          path: `forgot-password`,
          element: <ForgotPassword/>
        },
        {
          path: `reset-password/:email_id`,
          element: <ResetPassword/>
        },
        {
          path: `login-demo`,
          element: <LoginDemo/>
        },
        {
          path: `role-not-assigned`,
          element: <RoleNotAssignedPage/>
        },
        {
          path: `get-all-projects`,
          element: <GetAllProjects/>
        }
      ]
    }
  ]);

  return (
    <div className="App">
      {/* Router provider*/}
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

// default export  
export default App;

