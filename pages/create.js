import { HiOutlineChevronLeft, HiPlusCircle, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import style from "../styles/create.module.css";
import React, { useState } from "react";
import data from "../data/surveys_mock.json";

export default function Create() {
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
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
  const [questionData, setQuestionData] = useState([]);
  const [formData, setFormData] = useState({
    Surveys: [
      {
        id: surveys.length + 1,
        Title: "",
        Description: "",
        point: "",
        create_by: "Tongsu",
        created_at: formattedDate,
        update_at: formattedDate,
      },
    ],
    Questions: [
      {
        id: questions.length + 1,
        survey_id: surveys.length + 1,
        question: "",
      },
    ],
    Options: [
      {
        id: options.length + 1,
        question_id: questions.length + 1,
        option: ["", ""],
        score: ["", ""],
      },
    ],
    latestQuestionId: questions.length + 1,
  });

  const handleChangeSurvey = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      Surveys: [
        {
          ...prevData.Surveys[0],
          [name]:
            name === "point"
              ? value.trim() === ""
                ? null
                : parseInt(value)
              : value,
        },
      ],
    }));
  };

  const handleChangeQuestion = (e, questionIndex) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedQuestions = [...prevData.Questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [name]: value.trim() === "" ? null : value,
      };

      return {
        ...prevData,
        Questions: updatedQuestions,
      };
    });
  };

  const handleChangeOption = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedOptions = [...prevData.Options];

      // Update the option or score based on the input field's name
      updatedOptions[questionIndex][name][optionIndex] =
        value.trim() === "" ? null : value;

      return {
        ...prevData,
        Options: updatedOptions,
      };
    });
  };

  const addQuestion = () => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.Questions];
      const updatedOptions = [...prevData.Options];
      const qid =
        updatedQuestions.length > 0
          ? updatedQuestions[updatedQuestions.length - 1].id + 1
          : 1;
      const oid =
        updatedOptions.length > 0
          ? updatedOptions[updatedOptions.length - 1].id + 1
          : 1;
      updatedQuestions.push({
        id: qid,
        survey_id: prevData.Surveys[0].id,
        question: "",
      });
      updatedOptions.push({
        id: oid,
        question_id: qid,
        option: ["", ""],
        score: ["", ""],
      });

      return {
        ...prevData,
        Questions: updatedQuestions,
        Options: updatedOptions,
        // latestQuestionId: formData.latestQuestionId + 1,
      };
    });
  };

  const removeQuestion = (questionIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.Questions];
      const updatedOptions = [...prevData.Options];
      updatedQuestions.splice(questionIndex, 1);
      updatedOptions.splice(questionIndex, 1);

      return {
        ...prevData,
        Questions: updatedQuestions,
        Options: updatedOptions,
      };
    });
  };

  const addOption = (questionIndex) => {
    setFormData((prevData) => {
      const updatedOptions = [...prevData.Options];

      if (updatedOptions[questionIndex].option.length < 4) {
        updatedOptions[questionIndex].option = [
          ...updatedOptions[questionIndex].option,
          "",
        ];
        updatedOptions[questionIndex].score = [
          ...updatedOptions[questionIndex].score,
          "",
        ];
      }

      return {
        ...prevData,
        Options: updatedOptions,
      };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setFormData((prevData) => {
      const updatedOptions = [...prevData.Options];
      updatedOptions[questionIndex].option.splice(optionIndex, 1);
      updatedOptions[questionIndex].score.splice(optionIndex, 1);

      return {
        ...prevData,
        Options: updatedOptions,
      };
    });
  };

  const handleCreateSurvey = () => {
    const formattedSurveys = formData.Surveys.map((survey) => ({
      id: survey.id,
      Title: survey.Title,
      Description: survey.Description,
      point: survey.point,
      create_by: survey.create_by,
      created_at: survey.created_at,
      update_at: survey.update_at,
    }));
    const formattedQuestions = formData.Questions.map((question) => ({
      id: question.id,
      survey_id: question.survey_id,
      question: question.question,
    }));
    const formattedOptions = [];

    formData.Options.forEach((option) => {
      const optionsArray = option.option.map((opt, index) => ({
        id: option.id,
        question_id: option.question_id,
        option: opt,
        score: option.score[index],
      }));
      formattedOptions.push(...optionsArray);
    });
    console.log({ Surveys: formattedSurveys });
    console.log({ Questions: formattedQuestions });
    console.log({ Options: formattedOptions });
    
  };

  return (
    <div>
      <div class={style.header}>
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
        <h1>Create Survey</h1>
        <div className={style.card}>
          <p>{formData.Surveys[0].id}</p>
          <p>Title</p>
          <input
            type="text"
            id={style.input}
            name="Title"
            placeholder=""
            onChange={(e) => handleChangeSurvey(e)}
          />
          {formData.Surveys[0].Title === null ? (
            <label>0/100 Character</label>
          ) : (
            <label>{formData.Surveys[0].Title}/100 Character</label>
          )}
          <p>Description</p>
          <input
            type="text"
            id={style.input}
            name="Description"
            placeholder=""
            onChange={(e) => handleChangeSurvey(e)}
          />
          {formData.Surveys[0].Description === null ? (
            <label>0/5000 Character</label>
          ) : (
            <label>{formData.Surveys[0].Description}/5000 Character</label>
          )}
          <p>Point</p>
          <input
            type="number"
            id={style.input}
            name="point"
            placeholder="0"
            onChange={(e) => handleChangeSurvey(e)}
          />
        </div>
        {formData.Questions.length > 0 && (
          <div className={style.card2}>
            {formData.Questions.map((question, questionIndex) => (
              <div className={style.main} key={questionIndex}>
                <div className={style.card}>
                  <button
                    onClick={() => {
                      removeQuestion(questionIndex);
                    }}
                    id={style.btnclose}
                  >
                    <HiOutlineX />
                  </button>
                  <p>Question Survey ID {question.survey_id}</p>
                  <p>Question ID {question.id}</p>
                  <p>Choice Question {questionIndex + 1}</p>
                  <input
                    type="text"
                    id={style.input}
                    name="question"
                    placeholder=""
                    onChange={(e) => handleChangeQuestion(e, questionIndex)}
                    value={formData.Questions[questionIndex].question || ""}
                  />
                  {formData.Options[questionIndex].option.map(
                    (option, optionIndex) => (
                      <div key={optionIndex}>
                        <p id={style.psm}>Option {optionIndex + 1}</p>
                        <div className={style.flexr}>
                          <input
                            type="text"
                            id={style.inputsm}
                            name="option"
                            placeholder=""
                            onChange={(e) =>
                              handleChangeOption(e, questionIndex, optionIndex)
                            }
                            value={option}
                          />
                          <span>
                            <button
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                              id={style.btnclose2}
                            >
                              <HiOutlineX />
                            </button>
                          </span>
                        </div>
                        <p id={style.psm}>Score</p>
                        <input
                          type="text"
                          id={style.inputsm}
                          name="score"
                          placeholder="0"
                          onChange={(e) =>
                            handleChangeOption(e, questionIndex, optionIndex)
                          }
                          value={
                            formData.Options[questionIndex].score[
                              optionIndex
                            ] || ""
                          }
                        />
                      </div>
                    )
                  )}
                  <div className={style.main}>
                    {formData.Options[questionIndex].option.length >= 4 ? (
                      <>
                        <p>Option Maximum : 4</p>
                      </>
                    ) : (
                      <button
                        className={style.qbtn2}
                        onClick={() => {
                          addOption(questionIndex);
                        }}
                      >
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
        )}
        {formData.Questions.length >= 10 ? (
          <>
            <p>Question Maximum : 10</p>
          </>
        ) : (
          <>
            <button
              className={style.qbtn}
              onClick={() => {
                addQuestion();
              }}
            >
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
          <button className={style.createbtn} onClick={handleCreateSurvey}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
