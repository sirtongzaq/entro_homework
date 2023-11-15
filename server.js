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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
