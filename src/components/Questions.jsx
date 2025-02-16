import React, { useState } from "react";
import "../styles/Questions.css";
import { useLocation } from "react-router-dom";

const Questions = () => {
  const location = useLocation();
  const { quiz } = location.state || { quiz: {} };
  const questions = quiz.questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  if (!questions.length) {
    return <h2>No questions available</h2>;
  }

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const updateIndex = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert(`Quiz finished! Your score: ${score}/${questions.length}`);
    }
    setSelectedAnswer(null);
  };

  const submitHandler = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    updateIndex();
  };

  return (
    <div className="quiz-questions">
      <div className="quiz-box">
        <h1 style={{ fontSize: "25px" }}>{quiz.title}</h1>
        <hr />
        <div className="quiz">
          <h2 id="question">{questions[currentQuestion].question_text}</h2>
          <div className="quiz-btn">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`ansbtn ${
                  selectedAnswer === index ? "selected" : ""
                }`}
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="next-btn">
            <button id="submit" onClick={submitHandler}>
              Submit
            </button>
            <button id="next" onClick={updateIndex}>
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
