const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // <-- Add parentheses here
app.use(bodyParser.json());

const jsonFile = "data/surveys_mock.json";

app.post("/surveys", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    const { Surveys, Questions, Options } = JSON.parse(data);

    const newSurvey = req.body.Surveys;
    const newQuestion = req.body.Questions;
    const newOption = req.body.Options;

    Surveys.push(...newSurvey);
    Questions.push(...newQuestion);
    Options.push(...newOption);

    await fs.writeFile(
      jsonFile,
      JSON.stringify({ Surveys, Questions, Options }, null, 2),
      "utf8"
    );

    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/surveys/:id", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    let { Surveys, Questions, Options } = JSON.parse(data);

    const surveyId = parseInt(req.params.id);

    const surveyIndex = Surveys.findIndex((survey) => survey.id === surveyId);

    if (surveyIndex === -1) {
      return res.status(404).json({ error: "Survey not found" });
    }

    Surveys.splice(surveyIndex, 1);

    const associatedQuestions = Questions.filter(
      (question) => question.survey_id === surveyId
    );

    Questions = Questions.filter((question) => question.survey_id !== surveyId);

    const associatedOptionIds = associatedQuestions.map(
      (question) => question.id
    );

    Options = Options.filter(
      (option) => !associatedOptionIds.includes(option.question_id)
    );

    await fs.writeFile(
      jsonFile,
      JSON.stringify({ Surveys, Questions, Options }, null, 2),
      "utf8"
    );

    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/surveys/:id", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    let { Surveys, Questions, Options } = JSON.parse(data);
    const surveyId = parseInt(req.params.id);
    console.log("Received survey ID:", surveyId);
    const updatedSurvey = req.body.Surveys;
    const updatedQuestions = req.body.Questions;
    const updatedOptions = req.body.Options;
    const surveyIndex = Surveys.findIndex((survey) => survey.id === surveyId);
    if (surveyIndex === -1) {
      return res.status(404).json({ error: "Survey not found" });
    }

    if (Array.isArray(updatedSurvey)) {
      updatedSurvey.forEach((singleSurvey) => {
        const singleSurveyIndex = Surveys.findIndex(
          (survey) => survey.id === singleSurvey.id
        );
        if (singleSurveyIndex !== -1) {
          Surveys[singleSurveyIndex] = singleSurvey;
        }
      });
    } else {
      Surveys[surveyIndex] = updatedSurvey;
    }

    updatedQuestions.forEach((updatedQuestion) => {
      const questionIndex = Questions.findIndex(
        (question) => question.id === updatedQuestion.id
      );

      if (questionIndex !== -1) {
        Questions[questionIndex] = updatedQuestion;
      } else {
        Questions.push(updatedQuestion);
      }
    });

    updatedOptions.forEach((updatedOption) => {
      const optionIndex = Options.findIndex(
        (option) => option.id === updatedOption.id
      );

      if (optionIndex !== -1) {
        Options[optionIndex] = updatedOption;
      } else {
        Options.push(updatedOption);
      }
    });

    await fs.writeFile(
      jsonFile,
      JSON.stringify({ Surveys, Questions, Options }, null, 2),
      "utf8"
    );

    res.status(200).json({
      message: "Survey(s) updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
