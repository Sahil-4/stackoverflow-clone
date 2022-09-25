import React from "react";
import Question from "./Question";
import { useLocation } from "react-router-dom";

const Questions = () => {
  const location = useLocation();

  return (
    <div className="questions">
      <div className="title-ask-button-container">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button>Ask Question</button>
      </div>

      <h4>3 Questions</h4>

      <div className="questions-list">
        <Question />
        <Question />
        <Question />
      </div>
    </div>
  );
};

export default Questions;
