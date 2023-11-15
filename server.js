const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // <-- Add parentheses here
app.use(bodyParser.json());

const jsonFile = "surveys_mock.json";

// Create a new survey
app.post("/surveys", async (req, res) => {
  try {
    const data = await fs.readFile(jsonFile, "utf8");
    const surveys = JSON.parse(data).Surveys;
    const questions = JSON.parse(data).Questions;
    const options = JSON.parse(data).Options;

    const newSurvey = req.body.Surveys;
    const newQuestion = req.body.Questions;
    const newOption = req.body.Options;

    surveys.push(newSurvey);
    questions.push(newQuestion);
    options.push(newOption);
    await fs.writeFile(
      jsonFile,
      JSON.stringify(
        { Surveys: surveys, Questions: questions, Options: options },
        null,
        2
      ),
      "utf8"
    );

    res.status(201).json(newSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
