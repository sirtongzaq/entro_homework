import { HiOutlineChevronLeft, HiPlusCircle, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import style from "../styles/create.module.css";
import React, { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [selectOption, setOption] = useState(false);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [newOption, setNewOption] = useState("");

  const addOption = () => {
    const newOptionText = `Option ${options.length + 1}`;
    setOptions((prevOptions) => [...prevOptions, newOptionText]);
    setFormData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ""],
      score: [...prevData.score, ""],
    }));
  };

  const removeOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    setFormData((prevData) => {
      const updatedOptions = [...prevData.options];
      const updatedScore = [...prevData.score];
      updatedOptions.splice(index, 1);
      updatedScore.splice(index, 1);
      return {
        ...prevData,
        options: updatedOptions,
        score: updatedScore,
      };
    });
  };

  const [formData, setFormData] = useState({
    title: null,
    desc: null,
    point: null,
    question: null,
    options: [],
    score: [],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("options")) {
      setFormData((prevData) => {
        const updatedOptions = [...prevData.options];
        updatedOptions[index] = value;
        return {
          ...prevData,
          options: updatedOptions,
        };
      });
    } else if (name.startsWith("score")) {
      setFormData((prevData) => {
        const updatedScore = [...prevData.score];
        updatedScore[index] = value;
        return {
          ...prevData,
          score: updatedScore,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreateSurvey = () => {
    console.log("Title:", formData.title);
    console.log("Description:", formData.desc);
    console.log("Point:", formData.point);
    console.log("Question:", formData.question);
    console.log("Options:", formData.options);
    console.log("Score:", formData.score);
  };

  const addOptionAndScoreLabel = console.log("s");

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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <button
          className={style.qbtn}
          onClick={() => {
            setOption(!selectOption);
            console.log(selectOption);
          }}
        >
          <span id={style.plus_icon}>
            <HiPlusCircle />
          </span>
          Question
        </button>
        {selectOption && (
          <div className={style.card}>
            <button
              onClick={() => {
                setOption(!selectOption);
              }}
              id={style.btnclose}
            >
              <HiOutlineX />
            </button>
            <p>Choice Question </p>
            <input
              type="text"
              id={style.input}
              name="question"
              placeholder=""
              onChange={handleInputChange}
              value={formData.question}
            />
            {options.map((option, index) => (
              <div key={index}>
                <p id={style.psm}>{option}</p>
                <div className={style.flexr}>
                  <input
                    type="text"
                    id={style.inputsm}
                    name={`options[${index}]`}
                    placeholder=""
                    onChange={(e) => handleInputChange(e, index)}
                    value={formData.options[index] || ""}
                  />
                  <span>
                    <button
                      onClick={() => removeOption(index)}
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
                  name={`score[${index}]`}
                  placeholder="0"
                  onChange={(e) => handleInputChange(e, index)}
                  value={formData.score[index] || ""}
                />
              </div>
            ))}
            <div className={style.main}>
              <button
                className={style.qbtn2}
                onClick={() => {
                  addOption();
                }}
              >
                <span id={style.plus_icon}>
                  <HiPlusCircle />
                </span>
                Option
              </button>
            </div>
          </div>
        )}
        <div className={style.btnflex}>
          <button className={style.cancelbtn}>Cancel</button>
          <button className={style.createbtn} onClick={handleCreateSurvey}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
