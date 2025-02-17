import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Signin = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
     e.preventDefault();
   
     try {
       const response = await axios.post(
         `${BASE_URL}/user/signin`,
         { name, email, password },
         {
           withCredentials: true,
           headers: { "Content-Type": "application/json" },
         }
       );
       if (response.status === 200) {
         console.log("Signin successful:", response.data);
         setIsLoggedIn(true);  
         alert("Signin successful");
         navigate("/"); 
       }

     } 
     catch (error) {
       console.error("Signin error:", error.response?.data || error.message);
alert("Invalid email or paswword");
     }
   };

  return (
     
        <div className="outer">
          <div className="content">
            <h1 style={{marginBottom:"20px"}}>Login</h1>
             <main>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                 <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 <footer>
                  <button type="submit" className="signup">
                    Sign in
                  </button>
                 <Link to="/user/signup"> <p id="createaccount">Don't have an account ?</p></Link>
                </footer>
              </form>
            </main>
          </div>
        </div>
       
  );
}

export default Signin
