var express = require('express');
var router = express.Router();
const api = require('../helpers/api-calls');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', async (req, res, next) => {
  // Get espn data
  const espnData = await api.getEspnData();

  // Convert the object to a JSON string
  const jsonString = JSON.stringify(espnData, null, 4);

  // Write to a file (e.g., at the project root)
  const filePath = path.join(__dirname, '..', 'espnData.json');
  fs.writeFileSync(filePath, jsonString);

  res.render('index', { title: 'Express' });
});

module.exports = router;