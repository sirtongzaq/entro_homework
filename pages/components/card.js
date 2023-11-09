import React from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const Card = ({ question, survey }) => {
  return (
    <div key={question.id} className="container">
      <div className="card-body">
        <h2 className="question-header">
          {question.question}
          <div className="float-right">
            <span>
              <button className="icon-btn-view">
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
  );
};

export default Card;
