import React from "react";
import { Link } from "react-router-dom";

const Question = () => {
  return (
    <div className="question">
      <div className="question-reach">
        <span>
          0 <br /> Votes
        </span>
        <span>
          0 <br /> Answers
        </span>
      </div>

      <div className="question-info-container">
        <div className="question-title-container">
          <Link to="question/view=question-name">
            <p className="question-title">What is programming ?</p>
          </Link>
        </div>

        <div className="question-info">
          <div className="tags">
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
            <span>tags</span>
          </div>

          <div className="info">
            <span>asked 12 Minutes ago</span>
            <span>
              by : <Link to="users/Alpha"> Alpha</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
