import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import styled from 'styled-components';
import axios from 'axios';
import emailjs from 'emailjs-com';

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

    const { flightID } = useParams();

    const [flightInfo, setFlightInfo] = useState([]);
    const [seatData, setSeatData] = useState([]);
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cancellationInsurance, setCancellationInsurance] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [lastInsertID, setLastInsertID] = useState([]);

    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
    };

    // const handleConfirmPayButton = async () => {
    //     alert(`Your Booking Has Been Created! An Email has been sent to ${userDetails.email} for confirmation`);
    //     try {
    //         const bookingResponse = await createBooking();
    //         const bookingID = bookingResponse.data.insertId;
    //         console.log(bookingID);
    
    //         await updateSeatAvailability();
    //         if (bookingID) {
    //             await addSeatsToBooking(bookingID);
    //         } else {
    //             console.error("Invalid lastInsertID");
    //         }
    //         navigate('/Home');
    //     } catch (error) {
    //         console.error("Error creating booking:", error);
    //     }
    // };    
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleConfirmPayButton = async () => {
        alert(`Your Booking Has Been Created! An Email has been sent to ${userDetails.email} for confirmation`);
        try {
            await createBooking();
            setPaymentConfirmed(true)
            await updateSeatAvailability();
            navigate('/Home');
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };    

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

    const createBooking = async () => {
        var insuranceNum;
        if(cancellationInsurance === false){
            insuranceNum = 0;
        } else {
            insuranceNum = 1;
        }

        try {
            const response = await axios.post(`http://localhost:3001/api/flight/new_booking`, {
                flightID: flightID,
                userEmail: userDetails.email,
                insurance: `${insuranceNum}`,
                price: `${totalPrice}`
            });
            console.log("Booking successful");
            setLastInsertID(response.data.insertId);
            console.log(response.data.insertId);
        } catch (error) {
            console.error("Error creating Booking:", error);
            throw error;
        }
    };

    const updateSeatAvailability = async () => {
        try {
            const revertPromises = selectedSeatIds.map(async (seatNo) => {
                const response = await axios.put(`http://localhost:3001/api/flight/update_seat_availability?seatNo=${seatNo}&flightID=${flightID}`);
                console.log("Seat updated");
                console.log(response.data);
                return response;
            });
            await Promise.all(revertPromises);
        } catch (error) {
            console.error("Error updating seats:", error);
            throw error;
        }
    };

    // const addSeatsToBooking = async (bookingID, seatNo) => {
    //     try {
    //         const revertPromises = selectedSeatIds.map(async (seatNo) => {
    //             const response = await axios.put(`http://localhost:3001/api/flight/add_seats_to_booking?bookingID=${bookingID}&seatNo=${seatNo}&flightID=${flightID}`);
    //             console.log("Seat added to booking");
    //             console.log(response.data);
    //             return response;
    //         });
    //         await Promise.all(revertPromises);
    //     } catch (error) {
    //         console.error("Error updating booking:", error);
    //         throw error;
    //     }
    // };
    

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

    function formatCreditCardNumber(e) {
        const input = e.target;
        const value = input.value.replace(/\s/g, ''); // Remove existing spaces
        const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = formattedValue;
    }

    const handleSendReceiptButton = () => {
        const templateParams = {
            to_email: userDetails.email,
            subject: 'Flight Receipt',
            message: `Thank you for your payment. Total Price: $${totalPrice}. Selected Seats: ${selectedSeatIds.join(', ')}.`,
        };

        emailjs.send(
            'service_tv1w3i4',
            'template_6xww3jg',
            templateParams,
            'tycYXJZe_DlMa25fW'
        )
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };


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
                                <input type="text" id="cardNO" name="cardNO" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                                       title="Please enter a valid credit card number"
                                       required
                                       onChange={(e) => formatCreditCardNumber(e)}required />
                            </div>
                            <div class="input-group">
                                <label for="arrivalAirport">Expiry Date:</label>
                                <input type="text" id="expDate" name="expDate" placeholder="MM/YY"
                                       pattern="(0[1-9]|1[0-2])\/\d{2}" required />
                            </div>
                            <div class="input-group">
                                <label for="date">CVC</label>
                                <input type="text" id="cvc" name="cvc" pattern="\d{3}" inputMode="numeric" required />
                            </div>
                            <div class="input-group">
                                <label for="date">Email:</label>
                                <input type="text" 
                                    id="email" 
                                    name="email" 
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    required 
                                />
                            </div>
                        </form>
                        <button onClick={() => handleConfirmPayButton()} className="btn">Confirm and Pay</button>
                        <div style={{ height: '20px' }}></div>
                        {paymentConfirmed && (
                            <button onClick={() => handleSendReceiptButton()} className="btn">
                                Send Receipt to Email
                            </button>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedFlight;