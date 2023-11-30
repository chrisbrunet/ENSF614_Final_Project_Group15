import React from 'react';
import '../css/styles.css';
import { useNavigate } from 'react-router-dom';

const AgentHome = () => {

    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
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
                        <input type="text" id="bookingID" name="bookingID" required />
                    </div>
                    <button type="submit" className="btn">
                        Search
                    </button>
                </form>
            </div>
            <div className="card" id="loginForm">
                <h2>Passenger List</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Seat</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>1A</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Boe</td>
                        <td>3C</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Schmoe</td>
                        <td>23E</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Hoe</td>
                        <td>12A</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentHome;
