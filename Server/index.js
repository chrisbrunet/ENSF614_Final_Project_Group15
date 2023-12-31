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

// ----------------------- START: SELECTING FLIGHT AND BOOKING TICKETS ------------------------
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
  let params = req.query;

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
  let params = req.query;
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

// similar to above endpoint but gets all seats on plane
app.get("/api/flight/seatmap", (req, res) => {
  let params = req.query;
  var sql = "SELECT s.seatNo, f.flightID, s.availability, s.seatType, f.basePrice*p.priceMultiplier AS seatPrice \
            FROM FLIGHT AS f \
            JOIN SEATS AS s \
            ON f.flightID = s.flightID \
            JOIN SEAT_TYPE_PRICES AS p \
            ON s.seatType = p.seatType \
            WHERE f.flightID = ? \
            ORDER BY s.rowNumber, s.columnChar;"
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1',
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
        res.send(result)
      } 
    }
  );
});

// update a seat availability
app.put("/api/flight/update_seat_availability", (req, res) => {
  let params = req.query;
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
      params.seatNo
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(result)
      } 
    }
  );
});

// add seat to booking 
app.post("/api/flight/add_seats_to_booking", (req, res) => {
  let params = req.body; // Use req.body instead of req.query for POST requests
  console.log(params);
  var sql = "INSERT INTO BOOKED_SEATS (bookingID, seatNo, flightID) \
            VALUES (?, ?, ?);";
  con.query(
      sql,
      [
        params.bookingID,
        params.seatNo,
        params.flightID
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      }
  );
});

// add payment to booking 
app.post("/api/flight/add_payment_to_booking", (req, res) => {
  let params = req.body;
  var sql = "INSERT INTO PAYMENT (bookingID, cardNo, status) \
            VALUES (?, ?, ?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      // '2',
      // '1234123412341234',
      // '1'
      params.bookingID,
      params.cardNo,
      params.status
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(result)
      } 
    }
  );
});
// ----------------------- END: SELECTING FLIGHT AND BOOKING TICKETS ------------------------


// ----------------------- START: SEARCH FOR AND CANCEL BOOKING BY USER ------------------------
// get booking information from booking id and email
app.get("/api/booking/get_booking", (req, res) => {
  let params = req.query;

  var sql = "SELECT b.bookingID, b.flightID, b.userEmail, b.insurance, \
            b.price, f.aircraftID, f.departCity, f.arriveCity, \
            f.flightDate, count(bs.seatNo) AS numSeats \
            FROM BOOKING AS b \
            JOIN FLIGHT AS f \
            ON b.flightID = f.flightID \
            JOIN BOOKED_SEATS AS bs \
            ON b.bookingID = bs.bookingID \
            WHERE b.bookingID = ? AND b.userEmail = ?;"; 
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1',
      // 'johndoe@gmail.com'
      params.bookingID,
      params.userEmail
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// get list of seats on booking
app.get("/api/booking/get_booked_seats", (req, res) => {
  let params = req.query;
  var sql = "SELECT * FROM BOOKED_SEATS \
            WHERE bookingID = ?"; 
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1'
      params.bookingID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// update seats status to available: used when user is cancelling a booking. you will have to loop through each seat.
app.put("/api/booking/revert_seat_availability", (req, res) => {
  let params = req.query;
  var sql = "UPDATE SEATS \
            SET availability = 0 \
            WHERE seatNo = ? AND flightID = ?"; 
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '1A',
      // '1'
      params.seatNo,
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

// cancel booking, cascades to BOOKING_SEATS and PAYMENT
app.put("/api/booking/cancel_booking", (req, res) => {
  let params = req.query;
  var sql = "DELETE FROM BOOKING \
            WHERE bookingID = ?;"; 
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '2'
      params.bookingID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});
// ----------------------- END: SEARCH FOR AND CANCEL BOOKING BY USER ------------------------



// ----------------------- START: ADDING AND MANAGING REGISTERED USERS ------------------------
// Add new registered user
app.post("/api/registered_user/new_user", (req, res) => {
  let params = req.body;
  var sql = "INSERT INTO REGISTERED_USER (email, firstName, lastName, address, birthdate, password) \
            VALUES (?,?,?,?,?,?);";
  con.query(
      sql,
      [
        // TEST PARAMS
        // 'apitest@gmail.com',
        // 'Christope',
        // 'Brunette',
        // '123 Calg AB',
        // '1996-11-06',
        // 'password1234567'
        params.email,
        params.firstName,
        params.lastName,
        params.address,
        params.birthdate,
        params.password
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).json({ success: false, error: "Internal server error" });
        } else {
          res.json({ success: true, result });
        }
      }
  );
});

// get registered user info by email and password: can also be used for login maybe?
app.get("/api/registered_user/get_user", (req, res) => {
  let params = req.query;  
  var sql = "SELECT * FROM REGISTERED_USER \
            WHERE email = ? AND password = ?;";
  con.query(
    sql, 
    [
      // TEST PARAMS
      // 'example@gmail.com',
      // 'pword1234567'
      params.email,
      params.password
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// check if user is signed up for airline credit card
app.get("/api/registered_user/check_airline_credit_card", (req, res) => {
  let params = req.body;
  var sql = "SELECT * FROM AIRLINE_CREDIT_CARD \
            WHERE userID = ?";
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '2'
      params.userID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// sign user up for airline credit card
app.post("/api/registered_user/credit_card_signup", (req, res) => {
  let params = req.body;
  var sql = "INSERT INTO AIRLINE_CREDIT_CARD (userID) \
            VALUES (?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      //  '2'
      params.userID
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(result)
      } 
    }
  );
});

// check if user is signed up for promotions
app.get("/api/registered_user/check_promotions", (req, res) => {
  let params = req.body;
  var sql = "SELECT * FROM PROMOTIONS \
            WHERE userID = ?";
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '2'
      params.userID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// sign user up for promotions
app.post("/api/registered_user/promotion_signup", (req, res) => {
  let params = req.body;
  var sql = "INSERT INTO PROMOTIONS (userID) \
            VALUES (?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      //  '2'
      params.userID
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(result)
      } 
    }
  );
});

// check user companion ticket usages
app.get("/api/registered_user/check_companion_tickets", (req, res) => {
  let params = req.body;
  var sql = "SELECT * FROM COMPANION_TICKETS \
            WHERE userID = ? \
            ORDER BY dateClaimed DESC;";
  con.query(
    sql, 
    [
      // TEST PARAMS
      // '2'
      params.userID
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// add companion ticket usage
app.post("/api/registered_user/use_companion_ticket", (req, res) => {
  let params = req.body;
  var sql = "INSERT INTO COMPANION_TICKETS (userID, dateClaimed) \
            VALUES (?, ?);";
  con.query(
    sql,
    [
      // TEST PARAMS
      //  '2',
      //  '2023-12-01'
      params.userID,
      params.dateClaimed
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(result)
      } 
    }
  );
});

app.put("/api/flight/update/:flightID", (req, res) => {
  let flightID = req.params.flightID;
  let data = req.body;
  var sql =
      "UPDATE FLIGHT SET departCity = ?, arriveCity = ?, flightDate = ? WHERE flightID = ?;";
  con.query(
      sql,
      [data.departCity, data.arriveCity, data.flightDate, flightID],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          res
              .status(500)
              .json({ success: false, error: "Internal server error" });
        } else {
          res.json({ success: true, result });
        }
      }
  );
});
// ----------------------- END: ADDING AND MANAGING REGISTERED USERS ------------------------


// ----------------------- START: ADMIN ACTIONS ------------------------
// admin agent login
app.get("/api/admin/get_user", (req, res) => {
  let params = req.query;  
  var sql = "SELECT * FROM SYS_ADMIN \
            WHERE email = ? AND password = ?;";
  con.query(
    sql, 
    [
      params.email,
      params.password
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});
app.post("/api/aircraft", (req, res) => {
  let data = req.body;
  var sql = "INSERT INTO AIRCRAFT (crewID, aircraftType, numBusinessRows, numComfortRows, numEconomyRows) \
             VALUES (?, ?, ?, ?, ?);";
  con.query(
      sql,
      [
        data.crewID,
        data.aircraftType,
        data.numBusinessRows,
        data.numComfortRows,
        data.numEconomyRows
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).json({ success: false, error: "Internal server error" });
        } else {
          res.json({ success: true, result });
        }
      }
  );
});
app.post("/api/crew/new_member", (req, res) => {
  let data = req.body;
  var sql = "INSERT INTO CREW (crewID) VALUES (?);";
  con.query(sql, [data.crewID], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    } else {
      res.json({ success: true, result });
    }
  });
});
app.get("/api/print_registered_user", (req, res) => {
  var sql = "SELECT * FROM REGISTERED_USER;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    } else {
      res.json({ success: true, registeredUsers: result });
    }
  });
});
app.delete("/api/flight/remove/:aircraftID", (req, res) => {
  const flightID = req.params.aircraftID;
  var sql = "DELETE FROM AIRCRAFT WHERE aircraftID = ?;";
  con.query(sql, [flightID], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    } else {
      res.json({ success: true, message: "Flight removed successfully" });
    }
  });
});
app.delete('/api/crew/remove/:crewID', (req, res) => {
  const crewID = req.params.crewID;
  const checkAircraftSql = 'SELECT * FROM AIRCRAFT WHERE crewID = ?';
  con.query(checkAircraftSql, [crewID], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ success: false, error: 'Crew member is still referenced in the aircraft table' });
    } else {
      const deleteCrewSql = 'DELETE FROM CREW WHERE crewID = ?';
      con.query(deleteCrewSql, [crewID], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ success: false, error: 'Internal server error' });
        } else {
          res.json({ success: true, message: 'Crew member removed successfully' });
        }
      });
    }
  });
});
app.get("/api/get_aircrafts", (req, res) => {
  const sql = "SELECT * FROM AIRCRAFT";

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching aircraft data:', err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});
// ----------------------- END: ADMIN ACTIONS ------------------------


// ----------------------- START: AIRLINE AGENT ACTIONS ------------------------
// airline agent login
app.get("/api/airline_agent/get_user", (req, res) => {
  let params = req.query;  
  var sql = "SELECT * FROM AIRLINE_AGENT \
            WHERE email = ? AND password = ?;";
  con.query(
    sql, 
    [
      params.email,
      params.password
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});

// get passenger list from a selected flight
app.get("/api/airline_agent/get_passenger_list", (req, res) => {
  let params = req.query;  
  var sql = "SELECT b.userEmail, bs.bookingID, bs.seatNo \
            FROM BOOKED_SEATS AS bs \
            JOIN BOOKING AS b \
            ON bs.bookingID = b.bookingID \
            WHERE bs.flightID = ?;";
  con.query(
    sql, 
    [
      params.flightID,
    ],
  (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result)
    }
  });
});
// ----------------------- END: AIRLINE AGENT ACTIONS ------------------------


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

