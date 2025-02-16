// Home.jsx
import React from 'react'
 import { Link } from "react-router-dom";
import "../styles/style.css"
import Navbar from './Navbar';
 
const Home = ({isLoggedIn , setIsLoggedIn}) => {
  return (
    <div className="Home">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="intro-container">
        <h2>Welcome to Quizzy</h2>
        <p>
          Test your knowledge with fun and challenging quizzes on various
          topics.
        </p>
        <p className="highlight-text">Are you ready?</p>

        <Link to="/my-quizzes" className="no-underline">
          <button className="my-quiz">My Quizzes</button>
        </Link>
      </div>
    </div>
  );
}

export default Home
