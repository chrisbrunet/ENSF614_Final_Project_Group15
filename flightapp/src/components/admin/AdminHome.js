import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const [formType, setFormType] = useState('');

    const toggleForm = (type) => {
        setFormType(type);
    };

    const changeAlert = () => {
        alert('The update has been confirmed.');
    };

    const registerdUsersAlert = () => {
        alert('Printing List of Registered Users...');
    };

    const renderForm = () => {
        switch (formType) {
            case 'addPlane':
                return (
                    <div className="card" id="addPlaneCard">
                        <h2>Add Plane</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="aircraftID">ID:</label>
                                <input type="text" id="aircraftID" name="aircraftID" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="type">Type:</label>
                                <input type="text" id="type" name="type" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Add
                            </button>
                        </form>
                    </div>
                );
            case 'removePlane':
                return (
                    <div className="card" id="removePlaneCard">
                        <h2>Remove Plane</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="aircraftID">ID:</label>
                                <input type="text" id="aircraftID" name="aircraftID" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Remove
                            </button>
                        </form>
                    </div>
                );
            case 'addCrew':
                return (
                    <div className="card" id="addCrewCard">
                        <h2>Add Crew</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="crewID">ID:</label>
                                <input type="text" id="crewID" name="crewID" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="crewSize">Size:</label>
                                <input type="text" id="crewSize" name="crewSize" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Add
                            </button>
                        </form>
                    </div>
                );
            case 'removeCrew':
                return (
                    <div className="card" id="removeCrewCard">
                        <h2>Remove Crew</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="crewID">ID:</label>
                                <input type="text" id="crewID" name="crewID" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Remove
                            </button>
                        </form>
                    </div>
                );
            case 'addDest':
                return (
                    <div className="card" id="addDestCard">
                        <h2>Add Destination</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="dest">New Destination:</label>
                                <input type="text" id="dest" name="dest" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Add
                            </button>
                        </form>
                    </div>
                );
            case 'removeDest':
                return (
                    <div className="card" id="removeDestCard">
                        <h2>Remove Destination</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="dest">Destination:</label>
                                <input type="text" id="dest" name="dest" required />
                            </div>
                            <button onClick={changeAlert} className="btn">
                                Remove
                            </button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="navbar">
                <h1>Admin Portal</h1>
                <button onClick={() => handleHomeButton()} className="btn">
                    Home
                </button>
            </div>

            <div className="card">
                <form>
                    <h2>Search Flights</h2>
                    <div className="input-group">
                        <input type="text" id="bookingID" name="bookingID" required />
                    </div>
                    <button type="submit" className="btn">
                        Search
                    </button>
                </form>
            </div>

            <div className="card">
                <h2>All Flights</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Departure City</th>
                        <th>Arrival City</th>
                        <th>Date</th>
                        <th>Crew</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Example</td>
                        <td>New York <button className="btn">Change</button></td>
                        <td>Los Angeles <button className="btn">Change</button></td>
                        <td>2023-11-25 <button className="btn">Change</button></td>
                        <td>A <button className="btn">Change</button></td>
                    </tr>
                    <tr>
                        <td>FL123</td>
                        <td>Calgary <button className="btn">Change</button></td>
                        <td>Toronto <button className="btn">Change</button></td>
                        <td>2023-12-01 <button className="btn">Change</button></td>
                        <td>B <button className="btn">Change</button></td>
                    </tr>
                    <tr>
                        <td>FL124</td>
                        <td>Vancouver <button className="btn">Change</button></td>
                        <td>Tokyo <button className="btn">Change</button></td>
                        <td>2023-12-05 <button className="btn">Change</button></td>
                        <td>C <button className="btn">Change</button></td>
                    </tr>
                    <tr>
                        <td>FL125</td>
                        <td>Los Angeles <button className="btn">Change</button></td>
                        <td>Space <button className="btn">Change</button></td>
                        <td>2023-12-05 <button className="btn">Change</button></td>
                        <td>A <button className="btn">Change</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h2>All Aircraft</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Aircraft ID</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>AC-130</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>F22</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>F14</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h2>Options</h2>
                <button onClick={() => toggleForm('addPlane')} className="btn">
                    Add Plane
                </button>
                <button onClick={() => toggleForm('removePlane')} className="btn">
                    Remove Plane
                </button>
                <button onClick={() => toggleForm('addCrew')} className="btn">
                    Add Crew
                </button>
                <button onClick={() => toggleForm('removeCrew')} className="btn">
                    Remove Crew
                </button>
                <button onClick={() => toggleForm('addDest')} className="btn">
                    Add Destination
                </button>
                <button onClick={() => toggleForm('removeDest')} className="btn">
                    Remove Destination
                </button>
                <button onClick={registerdUsersAlert} className="btn">
                    Print Registered User List
                </button>
            </div>

            {renderForm()}

        </div>
    );


}

export default AdminHome