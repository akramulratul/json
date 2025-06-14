const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start server
app.listen(port, () => {
  console.log(`✅ Fake API server is running on port ${port}`);
});

// Route: Simulated login (returns fake user)
app.post("/users", (req, res) => {
  const json = JSON.parse(fs.readFileSync("./json_responses/user.json"));
  res.json(json);
});

// Route: Climate data by site
app.get("/climateimpactbysite/:siteId", (req, res) => {
  const json = JSON.parse(fs.readFileSync("./json_responses/april.json"));
  res.json(json);
});

// Route: Climate data by user (monthly/yearly switch)
app.get("/climateimpactbyuser/:userId", (req, res) => {
  const starts = new Date(req.query.startDate);
  const ends = new Date(req.query.endDate);
  const startMonth = starts.getMonth() + 1;
  const endMonth = ends.getMonth() + 1;

  let fileName = "april.json";

  if (startMonth === 1 && endMonth === 12) {
    fileName = "current-year.json";
  } else if (startMonth === 1) {
    fileName = "january.json";
  }

  try {
    const json = JSON.parse(fs.readFileSync("./json_responses/" + fileName));
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: "File not found or failed to parse" });
  }
});
