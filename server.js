const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // <-- Add parentheses here
app.use(bodyParser.json());

const jsonFile = "data/surveys_mock.json";

// Create a new survey
app.post("/surveys", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    const { Surveys, Questions, Options } = JSON.parse(data);

    const newSurvey = req.body.Surveys;
    const newQuestion = req.body.Questions;
    const newOption = req.body.Options;

    const newOptionId =
      Options.length > 0 ? Options[Options.length - 1].id + 1 : 1;
    newOption.id = newOptionId;
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

// Delete a survey by ID
app.delete("/surveys/:id", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    const { Surveys, Questions, Options } = JSON.parse(data);

    const surveyId = parseInt(req.params.id, 10);

    // Remove survey
    const updatedSurveys = Surveys.filter((survey) => survey.id !== surveyId);

    // Remove related questions
    const updatedQuestions = Questions.filter(
      (question) => question.survey_id !== surveyId
    );

    // Remove related options
    const updatedOptions = Options.filter(
      (option) => option.question_id !== surveyId
    );

    await fs.writeFile(
      jsonFile,
      JSON.stringify(
        { Surveys: updatedSurveys, Questions: updatedQuestions, Options: updatedOptions },
        null,
        2
      ),
      "utf8"
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
