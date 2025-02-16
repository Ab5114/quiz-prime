//MyQuizzes.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MyQuizzes.css";
import Loading from "./Loading.jsx"
 
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/user/quizzes`, {
        withCredentials: true,
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
    finally{
      setLoading(false);
    }
  };

  fetchQuizzes();
}, []);



  const handleDelete = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      axios
        .delete(`${BASE_URL}/user/delete-quiz/${quizId}`, {
          withCredentials: true,
        })
        .then(() => {
          setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));  
          setTimeout(() => {
            alert("Quiz deleted successfully!");
          }, 1000);
        })
        .catch((error) => {
          console.error("Error deleting quiz:", error);
          alert("Failed to delete quiz.");
        });
    }
  };




  return (
    <>
      {loading && <Loading />}
       {!loading && (
        <div className="quizzes-list">
          <h2 className="myquizzes">My Quizzes</h2>{" "}
          <Link to="/user/create-quiz">
            {" "}
            <button className="add-quiz">Create New Quiz</button>
          </Link>
          <div className="quiz-container">
            {quizzes.length === 0 ? (
              <p className="no-quizzes">No quizzes found. Create one now!</p>
            ) : (
              quizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card">
                  <h3 className="title">{quiz.title}</h3>
                  <p className="descrip">{quiz.description}</p>

                  <Link to={`/quiz-questions`} state={{ quiz }}>
                    <button className="edit-quiz">Start Quiz</button>
                  </Link>

                  <p className="time">
                    Created: {new Date(quiz.created_at).toLocaleDateString()}
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/user/edit-quiz" state={{ quiz }}>
                      {" "}
                      <button className="editbtn">Edit Quiz</button>
                    </Link>
                    <button
                      className="delete-quiz"
                      onClick={() => handleDelete(quiz._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyQuizzes;
