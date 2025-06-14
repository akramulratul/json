const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port,() => {
  console.log(`Server listening port ${port}.`);
});

app.post('/users',(req,res) => {
  // Fake API does not check credentials, just returns fake user.
  const json = JSON.parse(fs.readFileSync('./json_responses/user.json'));
  res.json(json);
});

app.get('/climateimpactbysite/:siteId',(req,res) => {
  const json = JSON.parse(fs.readFileSync('./json_responses/april.json'));
  res.json(json);
});

app.get('/climateimpactbyuser/:userId',(req,res) => {
  const starts = new Date(req.query.startDate);
  const ends = new Date(req.query.endDate);
  const startMonth = starts.getMonth() + 1;
  const endMonth = ends.getMonth() + 1;

  let fileName = '';

  if (startMonth === 1 && endMonth === 12) {
    fileName ='current-year.json';
  } else if (startMonth === 1) {
    fileName = 'january.json';
  } else if (startMonth === 2) {
    fileName = 'february.json';
  } else if (startMonth === 3) {
    fileName = 'april.json';
  } else if (startMonth === 4) {
    fileName = 'april.json';
  } else if (startMonth === 5) {
    fileName = 'april.json';
  } else if (startMonth === 6) {
    fileName = 'april.json';
  } else if (startMonth === 7) {
    fileName = 'april.json';
  } else if (startMonth === 8) {
    fileName = 'april.json';
  } else if (startMonth === 9) {
    fileName = 'april.json';
  } else if (startMonth === 10) {
    fileName = 'april.json';
  } else if (startMonth === 11) {
    fileName = 'april.json';
  } else if (startMonth === 12) {
    fileName = 'april.json';
  }

  const json = JSON.parse(fs.readFileSync('./json_responses/' + fileName));
  res.json(json);
})