import React from "react";
import { Link } from "react-router-dom";
import Rightsidebar from "../Components/Rightsidebar";
import Sidebar from "../Components/Sidebar";

const Question = () => {
  const tags = ["Java", "Programming", "Array"];

  const Questionbody = () => {
    return (
      <div className="question-body-wrapper">
        <h2>What is programming?</h2>
        <div className="question-body-container">
          <div className="question-votes">
            <span>+</span>
            <span>0</span>
            <span>-</span>
          </div>
          <div className="question-body">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              cupiditate voluptas culpa consequuntur obcaecati nihil quas est
              similique laborum corrupti. Deleniti accusamus odio soluta
              explicabo reiciendis voluptatibus ut possimus quaerat! Lorems
              culpa consequuntur obcaecati nihil quas est similique laborum
              corrupti. Deleniti accusamus odio soluta explicabo reiciendis
              voluptatibus ut possimus quaerat!
            </p>
            <div className="tags">
              {tags.map((tag, index) => (
                <Link to={`/questions/tag==${tag}`}>
                  <span key={index}>{tag}</span>
                </Link>
              ))}
            </div>
            <div className="question-body-author-container">
              <div className="question-body-button-container">
                <button className="button">Share</button>
                <button className="button">Delete</button>
              </div>
              <div>
                <p>Asked 22 Hours ago</p>
                <div>
                  <span>A</span>
                  <span>
                    <Link to="users/Alpha"> Alpha</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Answerbody = () => {
    return (
      <div className="answer-wrapper">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          similique cumque eveniet, suscipit optio dolorum, facere natus porro
          quis sapiente rem repudiandae eius aliquid, doloribus necessitatibus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          similique cumque eveniet, suscipit optio dolorum, facere natus porro
          quis sapiente rem repudiandae eius aliquid, doloribus necessitatibus.
          Aperiam molestiae optio exercitationem!
        </p>
        <div className="question-body-author-container">
          <div>
            <button className="button">Share</button>
          </div>
          <div>
            <p>Answered 12 Minutes ago</p>
            <p>
              <span>A</span>
              <span>
                <Link to="users/Alpha"> Alpha</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main container view-question-page">
      <Sidebar></Sidebar>
      <div className="view-question-main-container">
        <div className="view-question-container">
          <Questionbody />
          <div className="answers-container">
            <h3>5 Answers</h3>
            <div className="all-answers">
              <Answerbody />
              <Answerbody />
              <Answerbody />
              <Answerbody />
              <Answerbody />
            </div>
          </div>

          <div className="answer-form-container">
            <h3>Your answer</h3>
            <form action="/">
              <textarea
                name="newanswer"
                id="newanswer"
                cols="60"
                rows="10"
              ></textarea>
              <button className="button">Post Your Answer</button>
            </form>

            <p className="tags">
              Browse other questions tagged
              {tags.map((tag, index) => (
                <Link to={`/questions/tag==${tag}`}>
                  <span key={index}>{tag}</span>
                </Link>
              ))}
              or <Link to="/post-question">ask your own question.</Link>
            </p>
          </div>
        </div>
        <Rightsidebar></Rightsidebar>
      </div>
    </div>
  );
};

export default Question;
