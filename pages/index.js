import { useRouter } from "next/router";
import data from "/data/surveys_mock.json";
import React, { useState } from "react";
import Card from "./components/card";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
  HiOutlineAdjustments,
  HiChevronDoubleUp,
  HiChevronDoubleDown,
} from "react-icons/hi";

export default function Home() {
  const router = useRouter();
  const navigateToCreate = () => {
    router.push("/create");
  };
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
  const [select, setSelect] = useState(false);
  const [sortData, setSortData] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredQuestions = questions.filter((question) => {
    const survey = surveys.find((survey) => survey.id === question.survey_id);
    const searchString = `${question.question.toLowerCase()} ${survey.create_by.toLowerCase()} ${survey.created_at.toLowerCase()}`;
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="main">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {select === false ? (
          <div className="dropdown">
            <button id="custom-select" onClick={() => setSelect(!select)}>
              <span>
                <HiChevronDoubleDown />
              </span>
              Sort
            </button>
            {select && (
              <div className="sort-options">
                <button onClick={() => setSortData("newest")}>Newest</button>
                <button onClick={() => setSortData("oldest")}>Oldest</button>
              </div>
            )}
          </div>
        ) : (
          <div className="dropdown">
            <button id="custom-select2" onClick={() => setSelect(!select)}>
              <span>
                <HiChevronDoubleUp />
              </span>
              Close
            </button>
            {select && (
              <div className="sort-options">
                {sortData === "newest" ? (
                  <>
                    <button
                      className="btn-active"
                      onClick={() => setSortData("newest")}
                    >
                      Newest
                    </button>
                    <button
                      className="sort-options-button"
                      onClick={() => setSortData("oldest")}
                    >
                      Oldest
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="sort-options-button"
                      onClick={() => setSortData("newest")}
                    >
                      Newest
                    </button>
                    <button
                      className="btn-active"
                      onClick={() => setSortData("oldest")}
                    >
                      Oldest
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        <button id="create-button" onClick={navigateToCreate}>
          <span>
            <HiPlus />
          </span>
          Create Survey
        </button>
      </div>
      {sortData === "newest" ? (
        <>
          {filteredQuestions
            .sort((a, b) => {
              const surveyA = surveys.find(
                (survey) => survey.id === a.survey_id
              );
              const surveyB = surveys.find(
                (survey) => survey.id === b.survey_id
              );
              return (
                new Date(surveyB.created_at) - new Date(surveyA.created_at)
              );
            })
            .map((question) => {
              const survey = surveys.find(
                (survey) => survey.id === question.survey_id
              );
              return <Card question={question} survey={survey} />;
            })}
        </>
      ) : (
        <>
          {filteredQuestions
            .sort((a, b) => {
              const surveyA = surveys.find(
                (survey) => survey.id === a.survey_id
              );
              const surveyB = surveys.find(
                (survey) => survey.id === b.survey_id
              );
              return (
                new Date(surveyA.created_at) - new Date(surveyB.created_at)
              );
            })
            .map((question) => {
              const survey = surveys.find(
                (survey) => survey.id === question.survey_id
              );
              return <Card question={question} survey={survey} />;
            })}
        </>
      )}
    </div>
  );
}
