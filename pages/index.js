import { useRouter } from "next/router";
import data from "/data/surveys_mock.json";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
  HiOutlineAdjustments,
} from "react-icons/hi";

export default function Home() {
  const router = useRouter();
  const navigateToCreate = () => {
    router.push("/create");
  };
  const surveys = data.Surveys;
  const questions = data.Questions;
  const options = data.Options;
  return (
    <div className="main">
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="Search..." />
        <button id="custom-select">
          <span>
            <HiOutlineAdjustments />
          </span>
          Sort
        </button>
        <button id="create-button" onClick={navigateToCreate}>
          <span>
            <HiPlus />
          </span>
          Create Survey
        </button>
      </div>
      {questions.map((question) => {
        const survey = surveys.find(
          (survey) => survey.id === question.survey_id
        );
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
                <span className="card-text-2">By {survey.created_at}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
