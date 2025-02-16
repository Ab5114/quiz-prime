import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "../styles/signup.css"
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;


const Signup = () => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

         const navigate = useNavigate(); 
     const handleSubmit = async (e) => {
       e.preventDefault(); 
       try {
         const response = await axios.post(
           `${BASE_URL}/user/signup`,
           { name, email, password },
           {
             withCredentials: true,
             headers: { "Content-Type": "application/json" },
           }
         );
         navigate("./");
         console.log("Signup successful:", response.data);
       } catch (error) {
         console.error("Signup error:", error.response?.data || error.message);
       }
     };

  return (
     
        <div className="outer">
          <div className="content">
            <h1>Signup</h1>
            <p>It just takes 30 seconds</p>
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
                  <button type="submit"   className="signup">
                    Sign up
                  </button>
                </footer>
              </form>
            </main>
          </div>
        </div>
      
  );
}

export default Signup
