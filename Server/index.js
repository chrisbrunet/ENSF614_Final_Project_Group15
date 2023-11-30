const express = require("express");
const PORT = 3001;
const app = express();
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");


app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "AIRLINE",
});

con.connect(function (err) {
  if (err) console.log(err);
  console.log("Successfully connected to database");
});

//API endpoints:

app.get('/data', (req, res) => {
  con.query('SELECT * FROM FLIGHT', (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});