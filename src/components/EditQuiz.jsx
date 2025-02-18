import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/editquiz.css";

const BASE_URL = "https://quiz-prime-services-production.up.railway.app";

const EditQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const { quiz } = location.state; 

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [questions, setQuestions] = useState(quiz.questions);

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
    setError("");
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: "", options: ["", ""], correct_index: 0 },
    ]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     if (title.trim() === "" || description.trim() === "") {
       setError("Title and Description cannot be empty.");
       return;
     }

     for (const question of questions) {
       if (
         question.question_text.trim() === "" ||
         question.options.some((opt) => opt.trim() === "")
       ) {
         setError("All questions and options must be filled out properly.");
         return;
       }
     }

    axios
      .put(
        `${BASE_URL}/user/edit-quiz/${quiz._id}`,
        { title, description, questions },
        { withCredentials: true }
      )
      .then(() => {
        alert("Quiz updated successfully!");
        navigate("/my-quizzes");
      })
      .catch((error) => console.error("Error updating quiz:", error));
  };

  return (
    <div className="edit-quiz-container">
      <h2 className="edit-quiz-title">Edit Quiz</h2>
      <form className="edit-quiz-form" onSubmit={handleSubmit}>
        <label className="edit-quiz-label">Title</label>
        <input
          type="text"
          className="edit-quiz-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          required
        />

        <label className="edit-quiz-label">Description</label>
        <textarea
          className="edit-quiz-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Quiz Description"
          required
        />

        <label className="edit-quiz-label">Questions</label>
        {questions.map((q, index) => (
          <div key={index} className="edit-quiz-question">
            <input
              type="text"
              className="edit-quiz-question-input"
              value={q.question_text}
              onChange={(e) =>
                handleQuestionChange(index, "question_text", e.target.value)
              }
              placeholder="Question Text"
              required
            />

            <label className="edit-quiz-label">Options</label>
            {q.options.map((option, optIndex) => (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  key={optIndex}
                  type="text"
                  className="edit-quiz-option-input"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...q.options];
                    newOptions[optIndex] = e.target.value;
                    handleQuestionChange(index, "options", newOptions);
                  }}
                  placeholder={`Option ${optIndex + 1}`}
                  required
                />
                <button
                  key={optIndex}
                  className="edit-quiz-delete-option"
                  onClick={(e) => {
                    const newOptions = q.options.filter(
                      (_, i) => i !== optIndex
                    );
                    handleQuestionChange(index, "options", newOptions);
                  }}
                >
                  {" "}
                  <i class="fa fa-trash-o "></i>
                </button>
              </div>
            ))}

            <label className="edit-quiz-label">Correct Answer Index:</label>
            <input
              type="number"
              className="edit-quiz-correct-index"
              value={q.correct_index}
              min="0"
              max={q.options.length - 1}
              onChange={(e) =>
                handleQuestionChange(
                  index,
                  "correct_index",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              required
            />

            <button
              type="button"
              className="edit-quiz-delete-btn"
              onClick={() => deleteQuestion(index)}
            >
              Delete Question
            </button>
          </div>
        ))}

        <button
          type="button"
          className="edit-quiz-add-btn"
          onClick={addQuestion}
        >
          Add Question
        </button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button type="submit" className="edit-quiz-submit-btn">
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
