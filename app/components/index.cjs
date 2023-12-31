import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: "YOUR OPENAI API KEY",
});

const openai = new OpenAIApi(config);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 512,
  });
  res.send(completion.data.choices[0].text);
});

const port = 5000;

app.listen(port, () => {
  console.log(`The server port is running at ${port}`);
});



