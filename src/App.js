import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";


import Home from "./Pages/CMS/Home/Home";
import Login from "./Pages/Auth/Login/Login";
import Header from "./Pages/Layout/Header";
import Footer from "./Pages/Layout/Footer";
import Jobs from "./Pages/CMS/Jobs/Jobs";
import JobDetails from "./Pages/CMS/Jobs/JobDetails";
import Register from "./Pages/Auth/Register/Registration";
import ProfileSettings from "./Pages/CMS/Profile/ProfileSettings";
import ApplicationForm from "./Pages/CMS/Application/ApplicationForm";
import MyApplications from "./Pages/CMS/Application/MyApplications";
import Contact from "./Pages/CMS/Contact/Contact";
export default function App() {
  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {toast.warning("Please go for login either you can't access product list")}
      </>
    );
  }
  const PublicRouteNames = [
    {
      path: "/",
      Component: <Login />,
    },
    {
      path: "/register",
      Component: <Register />,
    },
    {
      path: "/home",
      Component: <Home />,
    },
   
  ];
  const PrivateRouteNames = [
    {
      path: "/jobs",
      Component: <Jobs />,
    },
    {
      path: "/job/:id",
      Component: <JobDetails />,
    },
    {
      path: "/profile",
      Component: <ProfileSettings />,
    },
    {
      path: "/applicaiton-form/:id",
      Component: <ApplicationForm />,
    },
    {
      path: "/applications",
      Component: <MyApplications />,
    },
    {
      path: "/contact",
      Component: <Contact />,
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {PublicRouteNames.map((route, index) => {
            return (
              <Route
                exact
                path={route.path}
                element={route.Component}
                key={index}
              />
            );
          })}
          {PrivateRouteNames.map((route, index) => {
            return (
              <Route
                exact
                path={route.path}
                element={<PrivateRoute>{route.Component}</PrivateRoute>}
                key={index}
              />
            );
          })}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
