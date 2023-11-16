import {
  HiOutlineEye,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import style from "../../styles/delete.module.css";
import data from "../../data/surveys_mock.json";
export default function Delete({ surveyId, ToggleDelete }) {
  const deleteSurvey = async (x) => {
    try {
      const response = await fetch(`http://localhost:3001/surveys/${x}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Survey deleted successfully");
      } else {
        console.error("Failed to delete survey");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    ToggleDelete();
  };
  return (
    <div className={style.main}>
      <div className={style.card}>
        <button className={style.btnclose} onClick={ToggleDelete}>
          X
        </button>
        <div className={style.header}>
          <h1>Delete Survey</h1>
        </div>
        <p>
          Survey <span>"{surveyId.Title}"</span> is{" "}
          <span id={style.pactive}>Active</span> are you sure you want Delete
          Survey?
        </p>
        <div className={style.btnflex}>
          <button className={style.cancelbtn} onClick={ToggleDelete}>
            Cancel
          </button>
          <button
            className={style.createbtn}
            onClick={() => deleteSurvey(surveyId.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
