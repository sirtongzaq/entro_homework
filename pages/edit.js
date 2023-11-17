import { HiOutlineChevronLeft, HiPlusCircle, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import style from "../styles/create.module.css";
import React, { useState } from "react";
import data from "../data/surveys_mock.json";

export default function Edit() {
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
  const surveyId = parseInt(survey);
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
  const filteredSurvey = surveys.find((s) => s.id === surveyId);
  const questionsForSurvey = questions.filter((q) => q.survey_id === surveyId);
  const defaultQuestions = questionsForSurvey.map((question) => ({
    id: question.id,
    survey_id: question.survey_id,
    question: question.question,
    options: options.filter((o) => o.question_id === question.id),
  }));

  const defaultOptions = defaultQuestions.map((question) => {
    const optionsForQuestion = question.options.map((option) => ({
      id: option.id,
      question_id: option.question_id,
      option: option.option,
      score: option.score,
    }));

    return {
      id: optionsForQuestion.map((o) => o.id),
      question_id: question.id,
      option: optionsForQuestion.map((o) => o.option),
      score: optionsForQuestion.map((o) => o.score),
    };
  });

  const [formData, setFormData] = useState({
    Surveys: [
      {
        id: filteredSurvey.id,
        Title: filteredSurvey.Title,
        Description: filteredSurvey.Description,
        point: filteredSurvey.point,
        create_by: "Tongsu",
        created_at: formattedDate,
        update_at: formattedDate,
      },
    ],
    Questions: defaultQuestions,
    Options: defaultOptions,
    questionsForSurvey: questionsForSurvey,
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

      updatedOptions[questionIndex][name][optionIndex] =
        name === "score"
          ? value.trim() === ""
            ? null
            : parseInt(value)
          : value.trim() === ""
          ? null
          : value;

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

      const lastOid =
        updatedOptions.length > 0
          ? Math.max(...updatedOptions[updatedOptions.length - 1].id)
          : 0;
      const oid = lastOid + 1;

      updatedQuestions.push({
        id: qid,
        survey_id: prevData.Surveys[0].id,
        question: "",
      });

      const newIds = Array.from({ length: 2 }, (_, index) => oid + index);

      updatedOptions.push({
        id: newIds,
        question_id: qid,
        option: ["", ""],
        score: ["", ""],
      });

      return {
        ...prevData,
        Questions: updatedQuestions,
        Options: updatedOptions,
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
      const lastId = Math.max(...updatedOptions[questionIndex].id);
      const newId = lastId + 1;
      if (updatedOptions[questionIndex].option.length === 0) {

        const newIds = Array.from({ length: 2 }, (_, index) => cqid + index);
        const cqid = options.length;
        const newId2 = cqid + 1;
        updatedOptions[questionIndex].id.push(newId2);
        updatedOptions[questionIndex].option = [""];
        updatedOptions[questionIndex].score = [""];
      } else if (updatedOptions[questionIndex].option.length < 4) {
        updatedOptions[questionIndex].id.push(newId);
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
  const postData = async (updateData) => {
    const surveyIdToUpdate = surveyId;
    const response = await fetch(
      `http://localhost:3001/surveys/${surveyIdToUpdate}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (response.ok) {
      console.log("Survey updated successfully");
    } else {
      console.error("Failed to update survey");
    }
  };
  const handleCreateSurvey = async () => {
    try {
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
      const formattedOptions = formData.Options.reduce((acc, option) => {
        const optionsArray = option.option.map((opt, index) => ({
          id: option.id[index],
          question_id: option.question_id,
          option: opt,
          score: option.score[index],
        }));
        return acc.concat(optionsArray);
      }, []);
      console.log(formattedSurveys);
      console.log(formattedQuestions);
      console.log(formattedOptions);
      const updateData = {
        Surveys: formattedSurveys,
        Questions: formattedQuestions,
        Options: formattedOptions,
      };
      postData(updateData);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  if (!filteredSurvey) {
    return <p>Survey not found</p>;
  }
  return (
    <div>
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
        <h1>Create Survey</h1>
        <div className={style.card}>
          <p>Title</p>
          <input
            type="text"
            id={style.input}
            name="Title"
            placeholder=""
            value={formData.Surveys[0].Title}
            onChange={(e) => handleChangeSurvey(e)}
          />
          {formData.Surveys[0].Title === null ? (
            <label>0/100 Character</label>
          ) : (
            <label>{formData.Surveys[0].Title.length}/100 Character</label>
          )}
          <p>Description</p>
          <input
            type="text"
            id={style.input}
            name="Description"
            placeholder=""
            value={formData.Surveys[0].Description}
            onChange={(e) => handleChangeSurvey(e)}
          />
          {formData.Surveys[0].Description === null ? (
            <label>0/5000 Character</label>
          ) : (
            <label>
              {formData.Surveys[0].Description.length}/5000 Character
            </label>
          )}
          <p>Point</p>
          <input
            type="number"
            id={style.input}
            name="point"
            placeholder=""
            value={formData.Surveys[0].point}
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
                  <p>Question ID {question.id || "ID not available"}</p>
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
                        {/* <p>{formData.Options[questionIndex].id[optionIndex]}</p> */}
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
                          type="number"
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
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
