import { HiOutlineChevronLeft, HiPlusCircle, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import style from "../styles/create.module.css";
import React, { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [questionData, setQuestionData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    point: "",
    questions: [],
  });

  const addQuestion = () => {
    const newQuestionText = `Question ${questionData.length + 1}`;
    setQuestionData((prevQuestion) => [...prevQuestion, newQuestionText]);
    setFormData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        { question: "", options: ["", ""], score: ["", ""] },
      ],
    }));
  };

  const addOption = (questionIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].options.push("");
      updatedQuestions[questionIndex].score.push("");
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      updatedQuestions[questionIndex].score.splice(optionIndex, 1);
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const removeQuestion = (index) => {
    setQuestionData((prevQuestion) =>
      prevQuestion.filter((_, i) => i !== index)
    );
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions.splice(index, 1);
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim() === "" ? null : value,
    }));
  };

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      if (name.startsWith("options")) {
        updatedQuestions[questionIndex].options[optionIndex] = value;
      } else if (name.startsWith("score")) {
        updatedQuestions[questionIndex].score[optionIndex] = value;
      } else if (name.startsWith("question")) {
        updatedQuestions[questionIndex].question = value;
      } else {
        return prevData;
      }
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleCreateSurvey = () => {
    console.log("Title:", formData.title);
    console.log("Description:", formData.desc);
    console.log("Point:", formData.point);
    formData.questions.forEach((question, index) => {
      console.log(`  Question ${index + 1}: ${question.question}`);
      console.log("    Options:", question.options);
      console.log("    Scores:", question.score);
    });
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
          <p>Title</p>
          <input
            type="text"
            id={style.input}
            name="title"
            placeholder=""
            onChange={(e) => handleChange(e)}
          />
          {formData.title === null ? (
            <label>0/100 Character</label>
          ) : (
            <label>{formData.title.length}/100 Character</label>
          )}
          <p>Description</p>
          <input
            type="text"
            id={style.input}
            name="desc"
            placeholder=""
            onChange={(e) => handleChange(e)}
          />
          {formData.desc === null ? (
            <label>0/5000 Character</label>
          ) : (
            <label>{formData.desc.length}/5000 Character</label>
          )}
          <p>Point</p>
          <input
            type="text"
            id={style.input}
            name="point"
            placeholder="0"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {questionData.length > 0 && (
          <div className={style.card2}>
            {questionData.map((question, questionIndex) => (
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
                  <p>Choice Question {questionIndex + 1}</p>
                  <input
                    type="text"
                    id={style.input}
                    name={`question[${questionIndex}]`}
                    placeholder=""
                    onChange={(e) => handleInputChange(e, questionIndex)}
                    value={formData.questions[questionIndex].question || ""}
                  />
                  {formData.questions[questionIndex].options.map(
                    (option, optionIndex) => (
                      <div key={optionIndex}>
                        <p id={style.psm}>Option {optionIndex + 1}</p>
                        <div className={style.flexr}>
                          <input
                            type="text"
                            id={style.inputsm}
                            name={`options[${questionIndex}][${optionIndex}]`}
                            placeholder=""
                            onChange={(e) =>
                              handleInputChange(e, questionIndex, optionIndex)
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
                          name={`score[${questionIndex}][${optionIndex}]`}
                          placeholder="0"
                          onChange={(e) =>
                            handleInputChange(e, questionIndex, optionIndex)
                          }
                          value={
                            formData.questions[questionIndex].score[
                              optionIndex
                            ] || ""
                          }
                        />
                      </div>
                    )
                  )}
                  <div className={style.main}>
                    {formData.questions[questionIndex].options.length >= 4 ? (
                      <>
                        <button className={style.qbtn2} onClick={() => {}}>
                          <span id={style.plus_icon}>
                            <HiPlusCircle />
                          </span>
                          Option
                        </button>
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

        {questionData.length >= 10 ? (
          <>
            <button className={style.qbtn} onClick={() => {}}>
              <span id={style.plus_icon}>
                <HiPlusCircle />
              </span>
              Question
            </button>
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
