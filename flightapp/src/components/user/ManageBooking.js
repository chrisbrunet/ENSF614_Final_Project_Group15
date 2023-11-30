import React from 'react';
import '../css/styles.css';
import { useNavigate } from 'react-router-dom';

const ManageBooking = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert("search")
    };

    const handleCancelBooking = () => {
        alert("cancelled booking.")
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
                        <input type="text" id="bookingID" name="bookingID" required />
                    </div>
                    <h2>Email on Booking</h2>
                    <div class="input-group">
                        <input type="text" id="email" name="email" required />
                    </div>
                    <button type="submit" className="btn">
                        Search
                    </button>
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
                        <th>Tickets</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Example</td>
                        <td>New York</td>
                        <td>Los Angeles</td>
                        <td>2023-11-25</td>
                        <td>3</td>
                        <td>
                            <button onClick={handleCancelBooking} className="btn">
                                Cancel Booking
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooking;