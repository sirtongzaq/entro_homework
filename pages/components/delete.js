import {
  HiOutlineEye,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import style from "../../styles/view.module.css";
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
      <div className={style.cardsm}>
        <p>DELTE</p>
        <p>{surveyId}</p>
        <button onClick={ToggleDelete}>Cancel</button>
        <button onClick={() => deleteSurvey(surveyId)}>Delete</button>
      </div>
    </div>
  );
}
