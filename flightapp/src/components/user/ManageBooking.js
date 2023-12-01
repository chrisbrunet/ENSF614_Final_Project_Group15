import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ManageBooking = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert("search")
    };

    const handleCancelBooking = async (bookingID) => {
        alert(`Your Booking Has Been Cancelled. An Email has been sent to ${bookingCriteria.userEmail} for confirmation`)
        getBookedSeats(bookingID);
        revertSeatAvailability();
        await cancelBooking(bookingID);
        searchBookings();
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

    const [bookedSeats, setBookedSeats] = useState([]);

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

    const cancelBooking = async (bookingID) => {
        axios.put(`http://localhost:3001/api/booking/cancel_booking?bookingID=${bookingID}`)
        .then((response) => {
            console.log("Cancel successful");
            console.log(response);
        })
        .catch((error) => {
            console.error("Error cancelling Booking:", error);
        });
    };

    const getBookedSeats = (bookingID) => {
        axios.get(`http://localhost:3001/api/booking/get_booked_seats?bookingID=${bookingID}`)
        .then((response) => {
            console.log(response);
            setBookedSeats(response.data);
        })
        .catch((error) => {
            console.error("Error getting booked seats:", error);
        });
    };

    const revertSeatAvailability = () => {
        console.log(bookedSeats);
        bookedSeats.forEach((seat) => {
            const { flightID, seatNo } = seat;
            axios.put(`http://localhost:3001/api/booking/revert_seat_availability?seatNo=${seatNo}&flightID=${flightID}`)
            .then((response) => {
                console.log("Seat reverted");
                console.log(response);
            })
            .catch((error) => {
                console.error("Error reverting seats:", error);
            });
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
                                    <button onClick={() => { handleCancelBooking(booking.bookingID) }} className="btn">Cancel Booking</button>
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