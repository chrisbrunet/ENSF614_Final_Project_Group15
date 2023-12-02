import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentHome = () => {

    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
    };

    const [flightCritera, setFlightCritera] = useState ({
        flightID: ""
    });

    const [searchResults, setSearchResults] = useState([]);

    const searchFlights = () => {
        axios.get("http://localhost:3001/api/airline_agent/get_passenger_list", {
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

    return (
        <div>
            <div className="navbar">
                <h1>Airline Agent Portal</h1>
                <button onClick={() => handleHomeButton()} className="btn">
                    Home
                </button>
            </div>
            <div className="card">
                <form>
                    <h2>Flight Number</h2>
                    <div className="input-group">
                        <input 
                            type="text" 
                            id="flightID" 
                            name="flightID" 
                            value={flightCritera.flightID}
                            onChange={(e) => setFlightCritera({ ...flightCritera, flightID: e.target.value })}
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
            <div className="card" id="loginForm">
                <h2>Passenger List</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>BookingID</th>
                        <th>Seat</th>
                    </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((flight) => (
                            <tr key={flight.seatNo}>
                                <td>{flight.userEmail}</td>
                                <td>{flight.bookingID}</td>
                                <td>{flight.seatNo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentHome;
