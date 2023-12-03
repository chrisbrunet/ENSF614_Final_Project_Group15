import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../controller/user';

const Home = () => {
    const navigate = useNavigate();
    const {
        flightCriteria,
        setFlightCriteria,
        allFlights,
        searchResults,
        getAllFlights,
        searchFlights,
        resetFilters,
        formatDateString,
    } = useUser(); 

    const handleAccessPortal = () => {
        navigate('/userPortal');
    };

    const handleAdminLoginButton = () => {
        navigate('/adminLogin');
    };

    const handleSelectFlightButton = (flightID) => {
        navigate(`/selectFlight/${flightID}`);
    };

    const handleManageBookingButton = () => {
        navigate('/manageBooking');
    };

    const handleAgentLoginButton = () => {
        navigate('/agentLogin');
    };

    useEffect(() => {
        getAllFlights();
    }, []);

    return (
        <div>
            <div className="navbar">
                <h1>Flight Reservation Web Application</h1>
                <button onClick={handleAccessPortal} className="btn">
                    Member Login/Register
                </button>
                <button onClick={handleAdminLoginButton} className="btn">
                    Admin Login
                </button>
                <button onClick={handleAgentLoginButton} className="btn">
                    Airline Agent Login
                </button>
                <button onClick={handleManageBookingButton} className="btn">
                    Manage Existing Booking
                </button>
            </div>

            <div className="card">
                <h2>Search Flights</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="departCity">Departure City:</label>
                        <input
                            type="text"
                            id="departCity"
                            name="departCity"
                            value={flightCriteria.departCity}
                            onChange={(e) => setFlightCriteria({ ...flightCriteria, departCity: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="arriveCity">Arrival City:</label>
                        <input
                            type="text"
                            id="arriveCity"
                            name="arriveCity"
                            value={flightCriteria.arriveCity}
                            onChange={(e) => setFlightCriteria({ ...flightCriteria, arriveCity: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="flightDate">Date:</label>
                        <input
                            type="date"
                            id="flightDate"
                            name="flightDate"
                            value={flightCriteria.flightDate}
                            onChange={(e) => setFlightCriteria({ ...flightCriteria, flightDate: e.target.value })}
                            required
                        />
                    </div>
                    <button onClick={searchFlights} type="button" className="btn">
                        Search Flights
                    </button>
                </form>
            </div>

            <div className="card">
                <h2>Available Flights</h2>
                <button onClick={resetFilters} type="button" className="btn" style={{ marginLeft: '10px' }}>
                    Reset Filters
                </button>
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
                    {searchResults.map((flight) => (
                        <tr key={flight.flightID}>
                            <td>{flight.flightID}</td>
                            <td>{flight.departCity}</td>
                            <td>{flight.arriveCity}</td>
                            <td>{formatDateString(flight.flightDate)}</td>
                            <td>
                                <button onClick={() => handleSelectFlightButton(flight.flightID)} className="btn">
                                    Select Flight
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
