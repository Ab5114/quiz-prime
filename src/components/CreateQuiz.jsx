import "../styles/createquiz.css"
import React, { useState } from "react";
import axios from "axios";
import CreateLoader from "./CreateLoader";
import { useNavigate } from "react-router-dom";

 const BASE_URL = process.env.REACT_APP_BACKEND_URL;
 
const CreateQuiz = () => {

  const navigate=useNavigate();
  
  const [loading,setLoading]=useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question_text: "", options: ["", ""], correct_index: 0 },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: "", options: ["", ""], correct_index: 0 },
    ]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    console.log("title of quiz is ",title);
    console.log("desc of the quiz is ",description);
    console.log("questions of the quiz are",questions);


    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/user/create-quiz`,
        { title, description, questions },
        { withCredentials: true }
      );

      console.log("Quiz created:", response.data);
       setLoading(false);
      alert("Quiz created successfully!");

      setTitle("");
      setDescription("");
      setQuestions([
        { question_text: "", options: ["", ""], correct_index: 0 },
      ]);

      navigate("/my-quizzes");

    } 
    catch (error) {
      setLoading(false);
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
    }
     
  };

  return (
    <>
      {loading && <CreateLoader/>}
      {!loading && <div className="create-quiz-container">
        <h2>Create a Quiz</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
  
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
  
          <h3>Questions</h3>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="question-block">
              <input
                type="text"
                placeholder="Question Text"
                value={q.question_text}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].question_text = e.target.value;
                  setQuestions(newQuestions);
                }}
                required
              />
  
              <h4>Options</h4>
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option-group">
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                    required
                  />
                  {optionIndex >= 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].options.splice(
                          optionIndex,
                          1
                        );
                        setQuestions(newQuestions);
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
  
              <button
                type="button"
                onClick={() => handleAddOption(questionIndex)}
              >
                ➕ Add Option
              </button>
  
              <label>Correct Option Index:</label>
              <input
                type="number"
                min="0"
                max={q.options.length - 1}
                value={q.correct_index}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].correct_index = parseInt(
                    e.target.value
                  );
                  setQuestions(newQuestions);
                }}
                required
              />
            </div>
          ))}
  
          <button type="button" onClick={handleAddQuestion}>
            ➕ Add Question
          </button>
          <button type="submit">✅ Create Quiz</button>
        </form>
      </div>}
    
    </>);
};

export default CreateQuiz;

