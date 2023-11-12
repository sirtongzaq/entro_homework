import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";

import data from "/data/surveys_mock.json";
import PreviewPage from "./view";
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
        <PreviewPage
          currentQuestionIndex={currentQuestionIndex}
          questionsForSurvey={questionsForSurvey}
          currentQuestion={currentQuestion}
          options={options}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          ToggleView={ToggleView}
        />
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
                <button className="icon-btn-edit" onClick={() => {}}>
                  <HiOutlinePencil />
                </button>
              </span>
              <span>
                <button className="icon-btn-delete" onClick={() => {}}>
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
