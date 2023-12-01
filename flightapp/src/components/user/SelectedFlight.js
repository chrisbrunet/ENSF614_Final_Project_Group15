import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import styled from 'styled-components';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: auto;
`;

const StyledTableCell = styled.td`
  border: 1px solid #000;
  width: 30px; 
  height: 30px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  vertical-align: middle;

  &.selected {
    background-color: #007bff;
    color: #fff;
  }
`;

const SelectedFlight = () => {

    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const { flightID } = useParams();

    const [flightInfo, setFlightInfo] = useState([]);
    const [seatData, setSeatData] = useState([]);
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cancellationInsurance, setCancellationInsurance] = useState(false);

    const getFlightInfo = (flightID) => {
        axios.get(`http://localhost:3001/api/search_flights_by_id`, 
        {params: {
            flightID: flightID
          }
        })
        .then((response) => {
            console.log(response.data);
            setFlightInfo(response.data);
        })
        .catch((error) => {
            console.error("Error fetching flight details:", error);
        });
    };

    const getSeatMap = (flightID) => {
        axios.get(`http://localhost:3001/api/flight/seatmap`, 
        {params: {
            flightID: flightID
          }
        })
        .then((response) => {
            console.log(response.data);
            setSeatData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching seat details:", error);
        });
    };

    useEffect(() => {
       getFlightInfo(flightID);
       getSeatMap(flightID);
    }, [flightID]);

    const toggleSeat = (seatId) => {
        setSelectedSeatIds((prevSelectedSeatIds) => {
            if (prevSelectedSeatIds.includes(seatId)) {
                return prevSelectedSeatIds.filter((id) => id !== seatId);
            } else {
                return [...prevSelectedSeatIds, seatId];
            }
        });
    };

    const updateSelectedSeatsList = () => {
        return selectedSeatIds.map((seatId) => (
            <li key={seatId}>{seatId}</li>
        ));
    };

    const handleSeatClick = () => {
        updateSelectedSeatsList();
    };

    const calculateTotalPrice = () => {
        let newTotalPrice = 0;

        for(let i = 0; i < selectedSeatIds.length; i++){
            const selectedSeat = seatData.find(seat => seat.seatNo === selectedSeatIds[i]);

            if (selectedSeat) {
                let seatPrice = selectedSeat.seatPrice;
                console.log(seatPrice);
        
                newTotalPrice += seatPrice;
            } else {
                console.log("Seat not found in seatData.");
            }
        }

        if (cancellationInsurance) {
            newTotalPrice += 50;
        }

        setTotalPrice(newTotalPrice);
    };

    const handleCancellationInsuranceChange = () => {
        setCancellationInsurance((prevCancellationInsurance) => !prevCancellationInsurance);
        calculateTotalPrice();
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedSeatIds, cancellationInsurance]);

    const seatTableBody = [];
    let row = [];

    seatData.forEach((seatInfo, index) => {
    const seatId = seatInfo.seatNo;
    const isAvailable = seatInfo.availability === 0;

    const seatCell = (
        <StyledTableCell
        key={`row${index + 1}col${index + 1}`}
        onClick={() => isAvailable && toggleSeat(seatId)}
        className={selectedSeatIds.includes(seatId) ? 'selected' : isAvailable ? '' : 'unavailable'}
        style={{ backgroundColor: isAvailable ? '' : 'red', cursor: isAvailable ? 'pointer' : 'not-allowed' }}
        >
        {seatId}
        </StyledTableCell>
    );

    row.push(seatCell);

    if (row.length === 6 || index === seatData.length - 1) {
        seatTableBody.push(<tr key={`row${seatTableBody.length + 1}`}>{[...row]}</tr>);
        row = [];
    }
    });

    return (
        <div>
            <div className="navbar">
            <h1>Flight {flightInfo.length > 0 ? flightInfo[0].flightID : 'Loading...'} from {flightInfo.length > 0 ? flightInfo[0].departCity : 'Loading...'} to {flightInfo.length > 0 ? flightInfo[0].arriveCity : 'Loading...'}
            </h1>                
            <button onClick={handleHomeButton} className="btn">
                    Home
                </button>
            </div>
            <div className="card">
                <h2>Select Seats</h2>
                <div className="flex-container">
                    <div className="seat-map">
                        <StyledTable id="seatTable">
                            <tbody id="seatTableBody">{seatTableBody}</tbody>
                        </StyledTable>
                    </div>
                    <div className="selected-seats">
                        <h3>Selected Seats</h3>
                        <ul id="selectedSeatsList">{handleSeatClick()}</ul>
                        <div className="cancellation-insurance">
                            <input
                                type="checkbox"
                                id="cancellationInsurance"
                                checked={cancellationInsurance}
                                onChange={handleCancellationInsuranceChange}
                            />
                            <label htmlFor="cancellationInsurance">Cancellation Insurance (+$50)</label>
                        </div>
                        <div className="total-price">
                            Total Price: $<span id="totalPrice">{totalPrice}</span>
                        </div>
                        <h3>Payment Details</h3>
                        <form>
                            <div class="input-group">
                                <label for="cardNo">Name on Card:</label>
                                <input type="text" id="cardNO" name="cardNO" required />
                            </div>
                            <div class="input-group">
                                <label for="cardNo">Credit Card Number:</label>
                                <input type="text" id="cardNO" name="cardNO" required />
                            </div>
                            <div class="input-group">
                                <label for="arrivalAirport">Expiry Date:</label>
                                <input type="text" id="expDate" name="expDate" required />
                            </div>
                            <div class="input-group">
                                <label for="date">CVC</label>
                                <input type="text" id="cvc" name="cvc" required />
                            </div>
                            <div class="input-group">
                                <label for="date">Email:</label>
                                <input type="text" id="email" name="email" required />
                            </div>
                            <button class="submit">Confirm and Pay</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedFlight;