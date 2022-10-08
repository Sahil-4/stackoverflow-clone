import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Question = (props) => {
  return (
    <div className="question">
      <div className="question-reach">
        <span>
          {props.question.question_total_votes.length} <br /> Votes
        </span>
        <span>
          {props.question.question_total_answers.length} <br /> Answers
        </span>
      </div>

      <div className="question-info-container">
        <div className="question-title-container">
          <Link to={`/question/view/${props.question._id}`}>
            <p className="question-title">{props.question.question_title}</p>
          </Link>
        </div>

        <div className="question-info">
          <div className="tags">
            {props.question.question_tags.map((tag, index) => (
              <Link key={index} to={`/questions/tag=${tag}`}>
                <span>{tag}</span>
              </Link>
            ))}
          </div>

          <div className="info">
            <span>{moment(props.question?.timestamp).fromNow()}</span>
            <span>
              by :{" "}
              <Link to={`users/${props.question.question_author.id}`}>
                {" "}
                {props.question.question_author.name}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
