import { useRouter } from "next/router";
import data from "/data/surveys_mock.json";
import React, { useState } from "react";
import Card from "./components/card";
import { HiPlus, HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi";

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
  const filteredSurveys = surveys.filter((survey) => {
    const searchString = `${survey.Title.toLowerCase()} ${survey.create_by.toLowerCase()} ${survey.created_at.toLowerCase()}`;
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
      <p className="result">Results {filteredSurveys.length} items</p>
      <>
        {sortData === "newest" ? (
          <>
            {filteredSurveys
              .sort((a, b) => b.created_at.localeCompare(a.created_at))
              .map((survey) => {
                const question = questions.find(
                  (q) => q.survey_id === survey.id
                );
                const option =
                  options.filter((opt) => opt.question_id === question?.id) ||
                  [];
                return (
                  <Card question={question} survey={survey} option={option} />
                );
              })}
          </>
        ) : (
          <>
            {filteredSurveys
              .sort((b, a) => b.created_at.localeCompare(a.created_at))
              .map((survey) => {
                const question = questions.find(
                  (q) => q.survey_id === survey.id
                );
                const option = options.filter(
                  (opt) => opt.question_id === question.id
                );
                return (
                  <Card question={question} survey={survey} option={option} />
                );
              })}
          </>
        )}
      </>
    </div>
  );
}
