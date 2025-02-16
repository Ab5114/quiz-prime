 import Home from "./components/Home";
import MyQuizzes from "./components/MyQuizzes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizQuestions from "./components/Questions";
import Signup from "./components/Signup";
import Signin from "./components/Signin"
import CreateQuiz from "./components/CreateQuiz";
import EditQuiz from "./components/EditQuiz";

   function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/quiz-questions" element={<QuizQuestions />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/signin" element={<Signin/>} />
          <Route path="/user/create-quiz" element={<CreateQuiz/>}/>
          <Route path="/user/edit-quiz" element={<EditQuiz/>}/>
         </Routes>
      </Router>
    </>
  );
}

export default App;
