import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUser = () => {
    const [flightCriteria, setFlightCriteria] = useState({
        departCity: '',
        arriveCity: '',
        flightDate: '',
    });

    const [flightInfo, setFlightInfo] = useState([]);
    const [seatData, setSeatData] = useState([]);
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cancellationInsurance, setCancellationInsurance] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [lastInsertID, setLastInsertID] = useState([]);

    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

        const handleConfirmPayButton = () => {
            alert(`Your Booking Has Been Created!`);
            try {
                createBooking().then((bookingResponse) => {
                    if (bookingResponse && bookingResponse.data.insertId) {
                        updateSeatAvailability().then(() => {
                            return addSeatsToBooking(bookingResponse.data.insertId);
                        }).then(() => {
                            console.log("Seats added to booking");
                        }).catch((error) => {
                            console.error("Error updating seat availability or adding seats:", error);
                        });

                        setPaymentConfirmed(true);
                    } else {
                        console.error("Invalid bookingResponse");
                    }
                }).catch((error) => {
                    console.error("Error creating booking:", error);
                });
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        };
        const addSeatsToBooking = (bookingID) => {
            const addSeatsPromises = selectedSeatIds.map((seatNo) => {
                return axios.post(`http://localhost:3001/api/flight/add_seats_to_booking`, {
                    bookingID: bookingID,
                    seatNo: seatNo,
                    flightID: flightID
                });
            });

            return Promise.all(addSeatsPromises)
                .then((responses) => {
                    console.log("Seats added to booking:", responses);
                })
                .catch((error) => {
                    console.error("Error adding seats to booking:", error);
                    throw error;
                });
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

        const createBooking = () => {
            var insuranceNum;
            if (cancellationInsurance === false) {
                insuranceNum = 0;
            } else {
                insuranceNum = 1;
            }

            return axios.post(`http://localhost:3001/api/flight/new_booking`, {
                flightID: flightID,
                userEmail: userDetails.email,
                insurance: `${insuranceNum}`,
                price: `${totalPrice}`
            })
                .then((response) => {
                    console.log("Booking successful");
                    setLastInsertID(response.data.insertId);
                    console.log(response.data.insertId);

                    return response;
                })
                .catch((error) => {
                    console.error("Error creating Booking:", error);
                    throw error;
                });
        };

        const updateSeatAvailability = () => {
            const revertPromises = selectedSeatIds.map((seatNo) => {
                return axios.put(`http://localhost:3001/api/flight/update_seat_availability?seatNo=${seatNo}&flightID=${flightID}`);
            });

            return Promise.all(revertPromises)
                .then((responses) => {
                    console.log("Seats updated:", responses);

                    return createBooking();
                })
                .catch((error) => {
                    console.error("Error updating seats:", error);
                    throw error; 
                });
        };

        useEffect(() => {
        getFlightInfo(flightID);
        getSeatMap(flightID);
        }, [flightID]);

        return {
            flightCriteria,
            flightInfo,
            seatData,
            selectedSeatIds,
            totalPrice,
            cancellationInsurance,
            userDetails,
            lastInsertID,
            handleConfirmPayButton,
            addSeatsToBooking,
            getFlightInfo,
            getSeatMap,
            createBooking,
            updateSeatAvailability
        };
    };