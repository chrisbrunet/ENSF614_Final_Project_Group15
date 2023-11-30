import React from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleAccessPortal = () => {
        navigate('/userPortal');
    };

    const handleAdminLoginButton = () => {
        navigate('/adminLogin');
    };

    const handleSelectFlightButton = () => {
        navigate('/selectFlight');
    };
    const handleManageBookingButton = () => {
        navigate('/manageBooking');
    };
    const handleAgentLoginButton = () => {
        navigate('/agentLogin');
    };

    return (
        <div>
            <div className="navbar">
                <h1>Flight Reservation Web Application</h1>
                <button onClick={() => { handleAccessPortal() }} className="btn">Member Login/Register</button>
                <button onClick={() => { handleAdminLoginButton()}} className="btn">Admin Login</button>
                <button onClick={() => { handleAgentLoginButton() }} className="btn">Airline Agent Login</button>
                <button onClick={() => { handleManageBookingButton() }} className="btn">Manage Existing Booking</button>
            </div>

            <div className="card">
                <h2>Search Flights</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="departureAirport">Departure Airport:</label>
                        <input type="text" id="departureAirport" name="departureAirport" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="arrivalAirport">Arrival Airport:</label>
                        <input type="text" id="arrivalAirport" name="arrivalAirport" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" required />
                    </div>
                    <button type="submit" className="btn">Search Flights</button>
                </form>
            </div>

            <div className="card">
                <h2>Available Flights</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Departure City</th>
                        <th>Arrival City</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Example</td>
                        <td>New York</td>
                        <td>Los Angeles</td>
                        <td>2023-11-25</td>
                        <td>
                            <button onClick={() => { handleSelectFlightButton() }} className="btn">Select Flight
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>FL123</td>
                        <td>Calgary</td>
                        <td>Toronto</td>
                        <td>2023-12-01</td>
                        <td>
                            <button className="btn">Select Flight</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FL124</td>
                        <td>Vancouver</td>
                        <td>Tokyo</td>
                        <td>2023-12-05</td>
                        <td>
                            <button className="btn">Select Flight</button>
                        </td>
                    </tr>
                    <tr>
                        <td>FL125</td>
                        <td>Los Angeles</td>
                        <td>Space</td>
                        <td>2023-12-05</td>
                        <td>
                            <button className="btn">Select Flight</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;

