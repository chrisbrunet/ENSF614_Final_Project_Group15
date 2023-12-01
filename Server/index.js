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

// Get all flights
app.get("/api/all_flights", (req, res) => {
  con.query("SELECT * FROM FLIGHT", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Get flights by search criteria
app.get("/api/search_flights_by_criteria", (req, res) => {
  let params = req.body;
  var sql = "SELECT * FROM FLIGHT WHERE departCity = ? and arriveCity = ? and flightDate = ?;"
  con.query(
    sql, 
    [
      // TEST PARAMS
      // 'Calgary',
      // 'Toronto',
      // '2023-12-05'
      params.departCity,
      params.arriveCity,
      params.flightDate
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// Get flight by ID
app.get("/api/search_flights_by_id", (req, res) => {
  let params = req.body;
  var sql = "SELECT * FROM FLIGHT WHERE flightID = ?;"
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1'
      params.flightID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// Get numRows by by flightID: this should help for setting up seat map on front end
app.get("/api/flight/num_rows", (req, res) => {
  let params = req.body;
  var sql = "SELECT numBusinessRows, numComfortRows, numEconomyRows \
            FROM FLIGHT AS f \
            JOIN AIRCRAFT AS a \
            on f.aircraftID = a.aircraftID \
            where flightID = ?;"
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1'
      params.flightID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// get seat availability, type, and price: this can also be used to create seat map + when user selects seats
app.get("/api/flight/seat_availability_type_price", (req, res) => {
  let params = req.body;
  var sql = "SELECT s.seatNo, f.flightID, s.availability, s.seatType, f.basePrice*p.priceMultiplier AS seatPrice \
            FROM FLIGHT AS f \
            JOIN SEATS AS s \
            ON f.flightID = s.flightID \
            JOIN SEAT_TYPE_PRICES AS p \
            ON s.seatType = p.seatType \
            WHERE f.flightID = ? AND seatNo = ?;"
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1',
      // '2A'
      params.flightID,
      params.seatNo
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// create new booking
app.post("/api/flight/new_booking", (req, res) => {
  let params = req.body;
  var sql =
    "INSERT INTO BOOKING (flightID, userEmail, insurance, price) \
    VALUES (?, ?, ?, ?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      // '1',
      // 'testfromapi@gmail.com',
      // '1', 
      // '550.00'
      params.flightID,
      params.userEmail,
      params.insurance,
      params.price
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).json('Success');
      } 
    }
  );
});

// update a seat availability
app.put("/api/flight/update_seat_availability", (req, res) => {
  let params = req.body;
  var sql = "UPDATE FLIGHT AS f \
            JOIN SEATS AS s \
            ON f.flightID = s.flightID \
            SET s.availability = 1 \
            WHERE f.flightID = ? and s.seatNO = ?;";
  con.query(
    sql,
    [
      // TEST PARAMS
      // '1',
      // '2B'
      params.flightID,
      params.seatNO
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).json('Success');
      } 
    }
  );
});

// Add new registered user
app.post("/api/registered_user/new", (req, res) => {
  let user = req.body;
  var sql =
    "INSERT INTO REGISTERED_USER (email, firstName, lastName, address, birthdate, password) VALUES (?,?,?,?,?,?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      // 'testfromapi@gmail.com',
      // 'Chris',
      // 'Brunet',
      // '123 Calg AB',
      // '1996-11-06',
      // 'password123'
      user.email,
      user.firstName,
      user.lastName,
      user.address,
      user.birthdate,
      user.password
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).json('Success');
      } 
    }
  );
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});