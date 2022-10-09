import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewQuestions } from "../redux/slice/questions";

const PostQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const [question, setQuestion] = useState({
    question_title: "",
    question_body: "",
    question_tags: [],
    question_author: {
      name: userProfile?.username,
      id: userProfile?.uid,
    },
  });

  const handleSubmit = () => {
    if (question.question_title !== "" && question.question_body !== "") {
      dispatch(postNewQuestions(question));
      navigate("/");
    } else {
      alert("please enter question title and body");
    }
  };

  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
    return () => {};
  }, []);

  return (
    <div className="main question-page">
      <div>
        <h1>Ask a Public Question</h1>
        <div className="question-form-container">
          <span>
            <label htmlFor="question_title">Title</label>
            <p>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              name="question_title"
              type="text"
              id="question_title"
              required="True"
              value={question.question_title}
              onChange={(e) => {
                setQuestion({ ...question, [e.target.name]: e.target.value });
              }}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
          </span>

          <span>
            <label htmlFor="question_body">Body</label>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <textarea
              name="question_body"
              id="question_body"
              required="True"
              value={question.question_body}
              onChange={(e) => {
                setQuestion({ ...question, [e.target.name]: e.target.value });
              }}
              cols="30"
              rows="10"
            ></textarea>
          </span>

          <span>
            <label htmlFor="question_tags">Tags</label>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input
              name="question_tags"
              type="text"
              id="question_tags"
              value={question.question_tags}
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.target.name]: e.target.value.split(","),
                });
              }}
              placeholder="e.g. (java asp.net-mvc windows)"
            />
          </span>
        </div>
        <button
          className="button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Review your Question
        </button>
      </div>
    </div>
  );
};

export default PostQuestion;
