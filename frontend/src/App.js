import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Chatbot from "./Components/Chatbot";
import Home from "./Pages/Home";
import Question from "./Pages/Viewquestion";
import PostQuestion from "./Pages/PostQuestion";
import Tags from "./Pages/Tags";
import Users from "./Pages/Users";
import UserProfile from "./Pages/UserProfile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PhoneLogin from "./Pages/PhoneLogin";

function App() {
  return (
    <Router>
      <Header />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Home />}></Route>
        <Route path="/question/view/:uid" element={<Question />}></Route>
        <Route path="/post-question" element={<PostQuestion />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:uid" element={<UserProfile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login-with-phone" element={<PhoneLogin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
