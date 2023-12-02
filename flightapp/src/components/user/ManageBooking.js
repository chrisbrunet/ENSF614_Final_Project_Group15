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
        await getBookedSeats(bookingID);
        console.log(bookedSeats)
        await revertSeatAvailability();
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
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error cancelling Booking:", error);
        });
    };

    const getBookedSeats = async (bookingID) => {
        axios.get(`http://localhost:3001/api/booking/get_booked_seats?bookingID=${bookingID}`)
        .then((response) => {
            console.log(response.data);
            setBookedSeats(response.data);
        })
        .catch((error) => {
            console.error("Error getting booked seats:", error);
        });
    };

    const revertSeatAvailability = async () => {
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
        }
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