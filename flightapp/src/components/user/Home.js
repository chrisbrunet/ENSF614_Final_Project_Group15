import React, { useState, useEffect } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

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

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().substring(0, 10);
    };

    const [flightCritera, setFlightCritera] = useState ({
        departCity: "",
        arriveCity: "",
        flightDate: ""
    });

    const [searchResults, setSearchResults] = useState([]);

    const searchFlights = () => {
        axios.get("http://localhost:3001/api/search_flights_by_criteria", {
            params: flightCritera
        })
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
        })
        .catch((error) => {
            console.error("Error fetching flights:", error);
        });
    };

    const getAllFlights = () => {
        axios.get("http://localhost:3001/api/all_flights")
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
        })
        .catch((error) => {
            console.error("Error fetching flights:", error);
        });
    };

    useEffect(() => {
        getAllFlights(); 
    }, []);

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
                        <label htmlFor="departCity">Departure City:</label>
                        <input 
                            type="text" 
                            id="departCity" 
                            name="departCity" 
                            value={flightCritera.departCity}
                            onChange={(e) => setFlightCritera({ ...flightCritera, departCity: e.target.value })}
                            required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="arriveCity">Arrival City:</label>
                        <input 
                            type="text" 
                            id="arriveCity" 
                            name="arriveCity" 
                            value={flightCritera.arriveCity}
                            onChange={(e) => setFlightCritera({ ...flightCritera, arriveCity: e.target.value })}
                            required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="flightDate">Date:</label>
                        <input 
                            type="date" 
                            id="flightDate" 
                            name="flightDate" 
                            value={flightCritera.flightDate}
                            onChange={(e) => setFlightCritera({ ...flightCritera, flightDate: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault(); 
                            searchFlights();
                        }}
                        type="button" 
                        className="btn"
                    >Search Flights</button>
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
                        {searchResults.map((flight) => (
                            <tr key={flight.flightID}>
                                <td>{flight.flightID}</td>
                                <td>{flight.departCity}</td>
                                <td>{flight.arriveCity}</td>
                                <td>{formatDateString(flight.flightDate)}</td>
                                <td>
                                    <button onClick={() => { handleSelectFlightButton(flight.flightID) }} className="btn">Select Flight</button>
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

