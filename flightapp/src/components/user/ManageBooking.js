import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from "emailjs-com";


const ManageBooking = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert("search")
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().substring(0, 10);
    };

    const [bookingCriteria, setBookingCriteria] = useState ({
        bookingID: "",
        userEmail: ""
    });

    const [searchResults, setSearchResults] = useState([]);

    const handleCancelBooking = async (bookingID) => {
        alert(`Your Booking Has Been Cancelled. An Email has been sent to ${bookingCriteria.userEmail} for confirmation`);

        try {
            const bookedSeats = await getBookedSeats(bookingID);
            console.log(bookedSeats);
            handleSendReceiptButton(bookingCriteria.userEmail)
            await revertSeatAvailability(bookedSeats);
            await cancelBooking(bookingID);
            searchBookings();
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    const getBookedSeats = async (bookingID) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/booking/get_booked_seats?bookingID=${bookingID}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error getting booked seats:", error);
            throw error;
        }
    };

    const revertSeatAvailability = async (bookedSeats) => {
        try {
            const revertPromises = bookedSeats.map(async (seat) => {
                const { flightID, seatNo } = seat;
                const response = await axios.put(`http://localhost:3001/api/booking/revert_seat_availability?seatNo=${seatNo}&flightID=${flightID}`);
                console.log("Seat reverted");
                console.log(response.data);
                return response;
            });
            await Promise.all(revertPromises);
        } catch (error) {
            console.error("Error reverting seats:", error);
            throw error;
        }
    };

    const cancelBooking = async (bookingID) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/booking/cancel_booking?bookingID=${bookingID}`);
            console.log("Cancel successful");
            console.log(response.data);
        } catch (error) {
            console.error("Error cancelling Booking:", error);
            throw error;
        }
    };

    const searchBookings = () => {
        axios.get("http://localhost:3001/api/booking/get_booking", {
            params: bookingCriteria
        })
        .then((response) => {
            setSearchResults(response.data);
        })
        .catch((error) => {
            console.error("Error fetching Bookings:", error);
        });
    };

    const handleSendReceiptButton = (email) => {
        const templateParams = {
            to_email: email,
            subject: 'Flight Cancelled',
            message: `You have been refunded for your payment. We hope to see you again.`,
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
                <h1>Manage Booking</h1>
                <button onClick={handleHomeButton} className="btn">
                    Home
                </button>
            </div>

            <div className="card">
                <form onSubmit={handleSearchSubmit}>
                    <h2>Booking ID</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            id="bookingID"
                            name="bookingID"
                            value={bookingCriteria.bookingID}
                            onChange={(e) => setBookingCriteria({ ...bookingCriteria, bookingID: e.target.value })}
                            required
                        />
                    </div>
                    <h2>Email on Booking</h2>
                    <div className="input-group">
                    <input
                            type="text"
                            id="email"
                            name="email"
                            value={bookingCriteria.userEmail}
                            onChange={(e) => setBookingCriteria({ ...bookingCriteria, userEmail: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            searchBookings();
                        }}
                        type="button"
                        className="btn"
                    >Search Bookings</button>
                </form>
            </div>

            <div className="card" id="loginForm">
                <h2>Search Results</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Departure City</th>
                        <th>Arrival City</th>
                        <th>Date</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchResults.map((booking) => (
                        booking.numSeats > 0 && (
                            <tr key={booking.bookingID}>
                                <td>{booking.flightID}</td>
                                <td>{booking.departCity}</td>
                                <td>{booking.arriveCity}</td>
                                <td>{formatDateString(booking.flightDate)}</td>
                                <td>{booking.numSeats}</td>
                                <td>{booking.price}</td>
                                <td>
                                <button onClick={() => handleCancelBooking(booking.bookingID)} className="btn">Remove Seats</button>
                                </td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooking;