import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import style from "../../styles/view.module.css";

const Card = ({ question, survey, option }) => {
  const [viewSelect, setViewSelect] = useState(false);

  const ToggleView = () => {
    setViewSelect(!viewSelect);
  };

  return (
    <>
      {viewSelect === true && option ? (
        <div className={style.main}>
          <div className={style.card}>
            <button onClick={ToggleView}>X</button>
            <div key={option.id}>
              <h1>Preview Mode</h1>
              <h2>ID : {option.id}</h2>
              <h2>QUESTION ID : {option.question_id}</h2>
              <h2>SCORE : {option.score}</h2>
              <h2>OPTION : {option.option}</h2>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div key={question.id} className="container">
        <div className="card-body">
          <h2 className="question-header">
            {question.question}
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