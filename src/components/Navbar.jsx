import React, { useEffect, useState } from 'react'
 import axios from "axios";

import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


 const handleLogout = () => {
   axios
     .post(
       `${BASE_URL}/user/logout`,
       {},
       { withCredentials: true }
     )
     .then(() => {
       setIsLoggedIn(false);
       console.log("User logged out");
     })
     .catch((error) => console.error("Logout failed:", error));
 };


  useEffect(()=>{
    fetch(`${BASE_URL}/user/checkAuth`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isAuthenticated);
        console.log("User is loggedIn checAuth", data);
      })
      .catch(() => setIsLoggedIn(false));
  },[]);
  return (
    <div>
      <div className="navbar-container">
        <h1 style={{ color: "#fff" }}>Quizzy</h1>
        <ul className="nav-links">
          
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/user/signup" className="btn btn-secondary">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/user/signin" className="btn btn-secondary">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar
