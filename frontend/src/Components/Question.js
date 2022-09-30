import React from "react";
import { Link } from "react-router-dom";

const Question = () => {
  const tags = ["Java", "Programming", "Array"];

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
          <Link to="/question/view:r14d0m">
            <p className="question-title">What is programming ?</p>
          </Link>
        </div>

        <div className="question-info">
          <div className="tags">
            {tags.map((tag, index) => (
              <Link to={`/questions/tag==${tag}`}>
                <span key={index}>{tag}</span>
              </Link>
            ))}
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
