import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {
    const navigate = useNavigate();

    const [planeCrewID, setPlaneCrewID] = useState("");
    const [planeAircraftType, setPlaneAircraftType] = useState("");
    const [planeNumBusinessRows, setPlaneNumBusinessRows] = useState(5);
    const [planeNumComfortRows, setPlaneNumComfortRows] = useState(5);
    const [planeNumEconomyRows, setPlaneNumEconomyRows] = useState(10);
    const handlePlaneAdd  = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/aircraft', {
            crewID: planeCrewID,
            aircraftType: planeAircraftType,
            numBusinessRows: planeNumBusinessRows,
            numComfortRows: planeNumComfortRows,
            numEconomyRows: planeNumEconomyRows,
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                alert("added aircraft")
            } else {
                alert(response.data);
            }
        })
            .catch((error) => {
                console.error("Error during registration:", error);
                alert("Registration failed. See console for details.");
            });
    };

    const [crewCrewID, setCrewCrewID] = useState("");
    const handleCrewAdd  = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/crew/new_member', {
            crewID: crewCrewID,
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                alert("added crew")
            } else {
                alert(response.data);
            }
        })
            .catch((error) => {
                console.error("Error during registration:", error);
                alert("Registration failed. See console for details.");
            });
    };

    const printUsers = () => {
        axios.get("http://localhost:3001/api/print_registered_user", {
        })
            .then((response) => {
                console.log(response.data.registeredUsers);
            })
            .catch((error) => {
                console.error("Error fetching registered users:", error);
            });
    };

    const [deleteFlight, setDeleteFlight] = useState(0);
    const removeFlight = (aircraftID) => {
        axios.delete(`http://localhost:3001/api/flight/remove/${aircraftID}`)
            .then((response) => {
                console.log(response.data);
                alert("removed aircraft")
                // Handle the success message as needed
            })
            .catch((error) => {
                console.error("Error removing flight:", error);
                alert("Error removing aircraft")
                // Handle the error as needed
            });
    };

    const [deleteCrew, setDeleteCrew] = useState("");
    const removeCrewMember = (crewID) => {
        console.log('Removing crew member with ID:', crewID);
        axios.delete(`http://localhost:3001/api/crew/remove/${crewID}`)
            .then((response) => {
                console.log('Response:', response.data);
                alert("removed crew")
                // Handle success message
            })
            .catch((error) => {
                console.error("Error removing crew member:", error);
                alert("crew cannot be removed as it is either incorrectly written or references an Aircraft.")
                // Handle the error, e.g., show an error message to the user
            });
    };

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
                                <label htmlFor="crewID">crewID:</label>
                                <input type="text" id="crewID" name="crewID" value={planeCrewID}
                                       onChange={(e) => setPlaneCrewID(e.target.value)}  required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="aircraftType">aircraftType:</label>
                                <input type="text" id="aircraftType" name="aircraftType" value={planeAircraftType}
                                       onChange={(e) => setPlaneAircraftType(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="numBusinessRows">numBusinessRows:</label>
                                <input type="text" id="numBusinessRows" name="numBusinessRows" value={planeNumBusinessRows}
                                       onChange={(e) => setPlaneNumBusinessRows(Number(e.target.value))} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="numComfortRows">numComfortRows:</label>
                                <input type="text" id="numComfortRows" name="numComfortRows" value={planeNumComfortRows}
                                       onChange={(e) => setPlaneNumComfortRows(Number(e.target.value))} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="numEconomyRows">numEconomyRows:</label>
                                <input type="text" id="numEconomyRows" name="numEconomyRows" value={planeNumEconomyRows}
                                       onChange={(e) => setPlaneNumEconomyRows(Number(e.target.value))} required />
                            </div>
                            <button onClick={handlePlaneAdd} className="btn">
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
                                <label htmlFor="deleteFlight">Plane id to remove:</label>
                                <input type="text" id="deleteFlight" name="deleteFlight" value={deleteFlight}
                                       onChange={(e) => setDeleteFlight(Number(e.target.value))} required />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); removeFlight(deleteFlight); }} className="btn">
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
                                <label htmlFor="crewCrewID">Crew ID:</label>
                                <input type="text" id="crewCrewID" name="crewCrewID" value={crewCrewID}
                                       onChange={(e) => setCrewCrewID(e.target.value)} required />
                            </div>
                            <button onClick={handleCrewAdd} className="btn">
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
                                <label htmlFor="deleteCrew">Crew ID to remove:</label>
                                <input
                                    type="text"
                                    id="deleteCrew"
                                    name="deleteCrew"
                                    value={deleteCrew}
                                    onChange={(e) => setDeleteCrew(e.target.value)}
                                    required
                                />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); removeCrewMember(deleteCrew); }} className="btn">
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
                <button onClick={printUsers} className="btn">
                    Print Registered User List
                </button>
            </div>

            {renderForm()}

        </div>
    );


}

export default AdminHome