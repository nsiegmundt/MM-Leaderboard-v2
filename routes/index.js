var express = require('express');
var router = express.Router();
const api = require('../helpers/api-calls');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', async (req, res, next) => {
  // Get data
  const day1Data = require('../day1Data.json');
  const espnData = await api.getEspnData();

  // Subtract day 2 data from day 1 data to get day 2 score
  espnData.forEach(x => {
    x.score -= day1Data.find(y => x.bracketName == y.bracketName).score;
  });

  espnData.sort((a, b) => b.score - a.score);

  res.render('index', { title: 'Day 2 Scores', day2Data: espnData});
});

router.put('/update-day1-data', async (req, res, next) => {
  console.log("updating day 1 data...")
  // Get espn data
  const espnData = await api.getEspnData();

  // Convert the object to a JSON string
  const jsonString = JSON.stringify(espnData, null, 4);

  // Write to a file (e.g., at the project root)
  const filePath = path.join(__dirname, '..', 'day1Data.json');
  fs.writeFileSync(filePath, jsonString);

  res.sendStatus(200);
});

module.exports = router;