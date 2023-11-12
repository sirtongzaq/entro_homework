import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import style from "../../styles/view.module.css";
import data from "/data/surveys_mock.json";

const Card = ({ question, survey, option }) => {
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
  const [viewSelect, setViewSelect] = useState(false);
  const ToggleView = () => {
    setViewSelect(!viewSelect);
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const questionsForSurvey = questions.filter((q) => q.survey_id === survey.id);

  const currentQuestion =
    currentQuestionIndex < questionsForSurvey.length
      ? questionsForSurvey[currentQuestionIndex]
      : null;
  return (
    <>
      {viewSelect && option.length > 0 ? (
        <div className={style.main}>
          <div className={style.cardlg}>
            <button className={style.btnclose} onClick={ToggleView}>
              X
            </button>
            <h1>Preview Mode</h1>
            <div className={style.cardsm}>
              <p>
                {currentQuestionIndex + 1}/{questionsForSurvey.length}
              </p>
              <div className={style.card}>
                {currentQuestion ? (
                  <div key={currentQuestionIndex}>
                    <p>| {currentQuestion.question}</p>
                    {options
                      .filter((o) => o.question_id === currentQuestion.id)
                      .map((opt, index) => (
                        <div key={opt.id}>
                          {index === 0
                            ? "A. "
                            : index === 1
                            ? "B. "
                            : index === 2
                            ? "C. "
                            : index === 3
                            ? "D. "
                            : "Error"}
                          {opt.option}, Score: {opt.score}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>No more questions.</p>
                )}
              </div>
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={
                  currentQuestionIndex === questionsForSurvey.length - 1
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div key={survey.id} className="container">
        <div className="card-body">
          <h2 className="question-header">
            {survey.Title}
            <div className="float-right">
              <span>
                <button className="icon-btn-view" onClick={ToggleView}>
                  <HiOutlineEye />
                </button>
              </span>
              <span>
                <button className="icon-btn-edit">
                  <HiOutlinePencil />
                </button>
              </span>
              <span>
                <button className="icon-btn-delete">
                  <HiOutlineTrash />
                </button>
              </span>
            </div>
          </h2>
          <p className="card-text-1">
            Created at: {survey.created_at} PM
            <span className="card-text-2">By {survey.create_by}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
