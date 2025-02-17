 import Home from "./components/Home";
import MyQuizzes from "./components/MyQuizzes";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import QuizQuestions from "./components/Questions";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CreateQuiz from "./components/CreateQuiz";
import EditQuiz from "./components/EditQuiz";
import axios from "axios";
 
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

 


   function App() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);

     useEffect(() => {
       const checkAuth = async () => {
         try {
           const response = await axios.get(`${BASE_URL}/user/checkAuth`, {
             withCredentials: true,  
           });
           setIsLoggedIn(response.data.isAuthenticated);
         } catch (error) {
           console.error("Error checking auth:", error);
           setIsLoggedIn(false);
         }
       };

       checkAuth();
     }, []);  
     return (
       <>
      
         <Router>
           <Routes>
             <Route
               path="/"
               element={
                 <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
               }
             />
             <Route
               path="/my-quizzes"
               element={
                 isLoggedIn ? (
                   <MyQuizzes />
                 ) : (
                   <Navigate to="/user/signin" replace={true} />
                 )
               }
             ></Route>
             <Route path="/quiz-questions" element={<QuizQuestions />} />
             <Route path="/user/signup" element={<Signup />} />
             <Route
               path="/user/signin"
               element={
                 <Signin
                   isLoggedIn={isLoggedIn}
                   setIsLoggedIn={setIsLoggedIn}
                 />
               }
             />
             <Route path="/user/create-quiz" element={<CreateQuiz />} />
             <Route path="/user/edit-quiz" element={<EditQuiz />} />
           </Routes>
         </Router>
       </>
     );
   }

export default App;
