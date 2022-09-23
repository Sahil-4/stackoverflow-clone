import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<div />}></Route>
        <Route path="/questions" element={<div />}></Route>
        <Route path="/tags" element={<div />}></Route>
        <Route path="/users" element={<div />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
