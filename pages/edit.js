import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import data from "../data/surveys_mock.json";
import style from "../styles/create.module.css";
import { HiOutlineChevronLeft, HiOutlineX, HiPlusCircle } from "react-icons/hi";

const Edit = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${currentDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentDate.getSeconds().toString().padStart(2, "0")}`;
  const router = useRouter();
  const { survey } = router.query;
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
  const surveyId = parseInt(survey);
  const filteredSurvey = surveys.find((s) => s.id === surveyId);
  const questionsForSurvey = questions.filter((q) => q.survey_id === surveyId);
  const optionsForQuestions = questionsForSurvey.map((question) => ({
    question_id: question.id,
    options: options.filter((o) => o.question_id === question.id),
  }));
  const [oldData, setOldData] = useState({
    Surveys: [
      {
        Title: "",
        Description: "",
        point: "",
        create_by: "Tongsu",
        created_at: formattedDate,
        update_at: formattedDate,
      },
    ],
    Questions: questionsForSurvey,
    Options: optionsForQuestions,
  });

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    setOldData((prevData) => {
      const newData = { ...prevData };

      // Split the name into parts based on dots
      const nameParts = name.split('.');

      // Traverse the data structure based on name parts
      let target = newData;
      for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];

        if (i === nameParts.length - 1) {
          // Update the value at the target field
          target[part] = value;
        } else {
          // Initialize the nested structure if it doesn't exist
          target[part] = target[part] || (isNaN(nameParts[i + 1]) ? {} : []);
          // Traverse deeper into the data structure
          target = target[part];
        }
      }

      return newData;
    });
  };

  const addQuestion = () => {
    console.log(oldData);
  };

  return (
    <>
      <div className={style.header}>
        <h1>
          <button
            id={style.back_btn}
            onClick={() => {
              router.back();
            }}
          >
            <span id={style.back_icon}>
              <HiOutlineChevronLeft />
            </span>
            Back
          </button>
        </h1>
      </div>
      <div className={style.main}>
        <h1>Edit Survey</h1>
        {filteredSurvey ? (
          <div className={style.card}>
            <p>Title</p>
            <input
              type="text"
              id={style.input}
              name="Surveys.Title"
              placeholder={filteredSurvey.Title}
              onChange={(e) => handleInputChange(e)}
            />
            {oldData.Surveys[0].Title === null ||
            oldData.Surveys[0].Title === undefined ? (
              <label>{filteredSurvey.Title.length}/100 Character</label>
            ) : (
              <label>{oldData.Surveys[0].Title.length}/100 Character</label>
            )}
            <p>Description</p>
            <input
              type="text"
              id={style.input}
              name="Surveys.Description"
              placeholder={filteredSurvey.Description}
              onChange={(e) => handleInputChange(e)}
            />
            {oldData.Surveys[0].Description === null ||
            oldData.Surveys[0].Description === undefined ? (
              <label>{filteredSurvey.Description.length}/5000 Character</label>
            ) : (
              <label>
                {oldData.Surveys[0].Description.length}/5000 Character
              </label>
            )}
            <p>Point</p>
            <input
              type="number"
              id={style.input}
              name="Surveys.point"
              placeholder={filteredSurvey.point}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        ) : (
          <p>Survey not found</p>
        )}
        {oldData.Questions.length > 0 ? (
          <div className={style.card2}>
            {oldData.Questions.map((question, questionIndex) => (
              <div className={style.main} key={questionIndex}>
                <div className={style.card}>
                  <button onClick={() => {}} id={style.btnclose}>
                    <HiOutlineX />
                  </button>
                  <p>Choice Question {questionIndex + 1}</p>
                  <input
                    type="text"
                    id={style.input}
                    name={`Questions[${questionIndex}].question`}
                    placeholder={question.question}
                    onChange={(e) => handleInputChange(e, questionIndex)}
                  />
                  {oldData.Options[questionIndex].options.map(
                    (opt, optionIndex) => (
                      <div key={optionIndex}>
                        <p id={style.psm}>Option {optionIndex + 1}</p>
                        <div className={style.flexr}>
                          <input
                            type="text"
                            id={style.inputsm}
                            name={`Options[${questionIndex}].options[${optionIndex}].option`}
                            placeholder={opt.option}
                            onChange={(e) =>
                              handleInputChange(e, questionIndex, optionIndex)
                            }
                          />
                          <span>
                            <button onClick={() => {}} id={style.btnclose2}>
                              <HiOutlineX />
                            </button>
                          </span>
                        </div>
                        <p id={style.psm}>Score</p>
                        <input
                          type="number"
                          id={style.inputsm}
                          name={`Options[${questionIndex}].options[${optionIndex}].score`}
                          placeholder={opt.score}
                          onChange={(e) =>
                            handleInputChange(e, questionIndex, optionIndex)
                          }
                        />
                      </div>
                    )
                  )}
                  <div className={style.main}>
                    {oldData.Options.length >= 4 ? (
                      <>
                        <p>Option Maximum : 4</p>
                      </>
                    ) : (
                      <button className={style.qbtn2} onClick={() => {}}>
                        <span id={style.plus_icon}>
                          <HiPlusCircle />
                        </span>
                        Option
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No questions found for this survey</p>
        )}
        {oldData.Questions.length >= 10 ? (
          <>
            <p>Question Maximum : 10</p>
          </>
        ) : (
          <>
            <button className={style.qbtn} onClick={() => {}}>
              <span id={style.plus_icon}>
                <HiPlusCircle />
              </span>
              Question
            </button>
          </>
        )}
        <div className={style.btnflex}>
          <button
            className={style.cancelbtn}
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            className={style.createbtn}
            onClick={() => {
              console.log(oldData);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
