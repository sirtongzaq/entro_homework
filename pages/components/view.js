import {
  HiOutlineEye,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import style from "../../styles/view.module.css";
import data from "/data/surveys_mock.json";
export default function View({
  currentQuestionIndex,
  questionsForSurvey,
  currentQuestion,
  options,
  prevQuestion,
  nextQuestion,
  ToggleView,
}) {
  return (
    <div className={style.main}>
      <div className={style.cardlg}>
        <button className={style.btnclose} onClick={ToggleView}>
          X
        </button>
        <h1 className={style.preheader}>
          <span>
            <HiOutlineEye />
          </span>
          Preview Mode
        </h1>
        <div className={style.cardsm}>
          <p className={style.pcolorherder}>
            {currentQuestionIndex + 1}/{questionsForSurvey.length}
          </p>
          <div className={style.card}>
            {currentQuestion ? (
              <div key={currentQuestionIndex}>
                <p>
                  <span className={style.pcolor}>|</span>{" "}
                  {currentQuestion.question}
                </p>
                {options
                  .filter((o) => o.question_id === currentQuestion.id)
                  .map((opt, index) => (
                    <div key={opt.id}>
                      <div className={style.btnanswer}>
                        {index === 0
                          ? "A. "
                          : index === 1
                          ? "B. "
                          : index === 2
                          ? "C. "
                          : index === 3
                          ? "D. "
                          : "Error"}
                        {opt.option}
                      </div>
                    </div>
                  ))}
                <div className={style.btncontroller}>
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <HiOutlineChevronLeft />
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={
                      currentQuestionIndex === questionsForSurvey.length - 1
                    }
                  >
                    <HiOutlineChevronRight />
                  </button>
                </div>
              </div>
            ) : (
              <p>No more questions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
