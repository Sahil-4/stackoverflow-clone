import React from "react";
import Question from "./Question";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "../redux/slice/questions";
import { useEffect } from "react";

const Questions = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    if (!questions.question_list) {
      dispatch(fetchAllQuestions());
    }
    return () => {};
  }, [dispatch, questions]);

  return (
    <div className="questions">
      <div className="title-ask-button-container">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <Link to="/post-question">
          <span className="button">Ask Question</span>
        </Link>
      </div>
      <h4>{questions.question_list?.length || 0} Questions</h4>
      <div className="questions-list">
        {questions.isLoading && <h2>Loading...</h2>}
        {questions.question_list?.length === 0 && <h2>No Questions</h2>}
        {questions.question_list?.map((question) => {
          return <Question key={question._id} question={question} />;
        })}
      </div>
    </div>
  );
};

export default Questions;
