import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rightsidebar from "../Components/Rightsidebar";
import Sidebar from "../Components/Sidebar";
import { deleteAnswer, postAnswer } from "../redux/slice/questions";
import {
  deleteQuestion,
  fetchAllQuestions,
  voteQuestion,
} from "../redux/slice/questions";

const Question = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const question_list = useSelector((state) => state.questions.question_list);
  const question_current = useSelector(
    (state) => state.questions.question_current
  );
  const userProfile = useSelector((state) => state.auth.userProfile);

  const [question, setQuestion] = useState({});

  useEffect(() => {
    if (!question_list) {
      dispatch(fetchAllQuestions());
    }
    return () => {};
  }, [dispatch, question_list]);

  useEffect(() => {
    question_list?.forEach((element) => {
      if (element._id === params.uid) {
        setQuestion(element);
      }
    });
  }, [params.uid, question_list]);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (question_current) {
      setQuestion(question_current);
    }
    return () => {};
  }, [question_current]);

  const Questionbody = () => {
    return (
      <div className="question-body-wrapper">
        <h2>{question.question_title}</h2>
        <div className="question-body-container">
          <div className="question-votes">
            <span
              onClick={() => {
                dispatch(voteQuestion(question._id));
              }}
            >
              +
            </span>
            <span>{question.question_total_votes?.length}</span>
            <span
              onClick={() => {
                dispatch(voteQuestion(question._id));
              }}
            >
              -
            </span>
          </div>
          <div className="question-body">
            <p>{question.question_body}</p>
            <div className="tags">
              {question.question_tags?.map((tag, index) => (
                <Link key={index} to={`/questions/tag=${tag}`}>
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
            <div className="question-body-author-container">
              <div className="question-body-button-container">
                <button
                  className="button"
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      `https://capable-platypus-fe9170.netlify.app/question/view/${question._id}`
                    );
                  }}
                >
                  Share
                </button>
                {userProfile?.uid === question.question_author?.id && (
                  <button
                    className="button"
                    onClick={() => {
                      dispatch(deleteQuestion(question._id));
                      navigate("/");
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div>
                <p>{moment(question.timestamp).fromNow()}</p>
                <div>
                  <span>A</span>
                  <span>
                    <Link to={`/users/${question.question_author?.id}`}>
                      {" "}
                      {question.question_author?.name}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Answerbody = (props) => {
    return (
      <div className="answer-wrapper">
        <p>{props.answer.answer_body}</p>
        <div className="question-body-author-container">
          <div className="question-body-button-container">
            <button className="button">Share</button>
            {userProfile?.uid === props.answer.answer_author?.uid && (
              <button
                className="button"
                onClick={() => {
                  dispatch(
                    deleteAnswer({ quid: question._id, auid: props.answer._id })
                  );
                }}
              >
                Delete
              </button>
            )}
          </div>
          <div>
            <p>{moment(props.answer.timestamp).fromNow()}</p>
            <p>
              <span>A</span>
              <span>
                <Link to={`/users/${props.answer.answer_author?.uid}`}>
                  {" "}
                  {props.answer.answer_author.name}
                </Link>
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
            <h3>{question.question_total_answers?.length} Answers</h3>
            <div className="all-answers">
              {question.question_total_answers?.map((answer) => {
                return <Answerbody key={answer._id} answer={answer} />;
              })}
            </div>
          </div>

          <div className="answer-form-container">
            <h3>Your answer</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!userProfile) {
                  navigate("/login");
                  return;
                }
                dispatch(
                  postAnswer({
                    answer: {
                      answer_body: answer,
                      answer_author: {
                        uid: JSON.parse(localStorage.getItem("userProfile"))
                          .uid,
                        name: JSON.parse(localStorage.getItem("userProfile"))
                          .username,
                      },
                    },
                    quid: params.uid,
                  })
                );
                setAnswer("");
              }}
            >
              <textarea
                name="newanswer"
                id="newanswer"
                cols="60"
                rows="10"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              ></textarea>
              <button type="submit" className="button">
                Post Your Answer
              </button>
            </form>

            <p className="tags">
              Browse other questions tagged
              {question.question_tags?.map((tag, index) => (
                <Link key={index} to={`/questions/tag=${tag}`}>
                  <span>{tag}</span>
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
