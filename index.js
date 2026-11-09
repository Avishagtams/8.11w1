// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")


// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// lets us read JSON from the request body (req.body)
app.use(express.json());

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)
app.get("/greet", function (req, res) {
  const timestamp = new Date().toISOString();
  res.json({ msg: "hi from get endpoint " + timestamp });
});

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)
app.get("/greet/:name", function (req, res) {
  const name = req.params.name;
  console.log("i got name: " + name);
  res.json({ msg: "got name: " + name });
});

app.get("/test", async function (req, res) {
  const name = "Bob";

  try {
    const response = await fetch("http://localhost:" + PORT + "/greet/" + name);
    const data = await response.json();

    if (data && data.msg === "got name: " + name) {
      res.json({ result: "ok" });
    } else {
      res.json({ result: "fail" });
    }
  } catch (err) {
    res.json({ result: "fail" });
  }
});

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")
const VALID_ACTIONS = ["joke", "cat fact"];

app.post("/action", async function (req, res) {
  const body = req.body;

  // check that the body exists before reading body.action
  if (!body || typeof body !== "object" || !VALID_ACTIONS.includes(body.action)) {
    return res.status(400).json({ msg: "body is malformed" });
  }

  try {
    if (body.action === "joke") {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&safe-mode");
      const data = await response.json();

      let joke = data.joke;
      if (data.type === "twopart") {
        joke = data.setup + " " + data.delivery;
      }

      return res.json({ joke: joke.toUpperCase() });
    }

    if (body.action === "cat fact") {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11", {
        headers: { "x-api-key": process.env.CAT_API_KEY },
      });
      const data = await response.json();

      return res.json({ length: String(data.length) });
    }
  } catch (err) {
    return res.status(500).json({ msg: "external API error" });
  }
});

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});