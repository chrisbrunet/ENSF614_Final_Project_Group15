import React, { useState, useEffect } from 'react';
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
    const handlePlaneAdd = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/aircraft', {
            crewID: planeCrewID,
            aircraftType: planeAircraftType,
            numBusinessRows: planeNumBusinessRows,
            numComfortRows: planeNumComfortRows,
            numEconomyRows: planeNumEconomyRows,
        })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    alert("added aircraft");
                    setAircraftList([...aircraftList, response.data]); // Update the state with the new aircraft
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
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const printUsers = () => {
        axios.get("http://localhost:3001/api/print_registered_user", {})
            .then((response) => {
                console.log(response.data.registeredUsers);
                setRegisteredUsers(response.data.registeredUsers); // Update the state with the fetched users
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
                alert("removed aircraft");
                setAircraftList(aircraftList.filter(aircraft => aircraft.aircraftID !== aircraftID)); // Update the state by removing the deleted aircraft
            })
            .catch((error) => {
                console.error("Error removing flight:", error);
                alert("Error removing aircraft");
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
    const [registeredUsersVisible, setRegisteredUsersVisible] = useState(false);

    const toggleRegisteredUsersList = () => {
        // Toggle the visibility state
        setRegisteredUsersVisible(!registeredUsersVisible);
        // If becoming visible, fetch the users
        if (!registeredUsersVisible) {
            printUsers();
        }
    };

    const [aircraftList, setAircraftList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get_aircrafts')
            .then((response) => {
                setAircraftList(response.data); // Just use response.data directly
            })
            .catch((error) => {
                console.error("Error fetching aircraft data:", error);
            });
    }, [aircraftList]);

    const [flights, setFlights] = useState([]);
    useEffect(() => {
        // Fetch the list of flights from the server
        axios.get('http://localhost:3001/api/all_flights')
            .then((response) => {
                setFlights(response.data);
            })
            .catch((error) => {
                console.error("Error fetching flight data:", error);
            });
    }, [flights]);

    const [editedFlight, setEditedFlight] = useState({
        flightID: null,
        departCity: "",
        arriveCity: "",
        flightDate: "",
    });
    const [editModalVisible, setEditModalVisible] = useState(false);
    const openEditModal = (flight) => {
        setEditedFlight({
            flightID: flight.flightID,
            departCity: flight.departCity,
            arriveCity: flight.arriveCity,
            flightDate: flight.flightDate,
        });
        setEditModalVisible(true);
    };
    const handleFlightUpdate = () => {
        axios
            .put(`http://localhost:3001/api/flight/update/${editedFlight.flightID}`, {
                departCity: editedFlight.departCity,
                arriveCity: editedFlight.arriveCity,
                flightDate: editedFlight.flightDate,
            })
            .then((response) => {
                console.log(response.data);
                alert("Flight updated successfully");
                setEditModalVisible(false);
            })
            .catch((error) => {
                console.error("Error updating flight:", error);
                alert("Error updating flight");
            });
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
                        <th>Action</th> {/* Add this column for the Edit button */}
                    </tr>
                    </thead>
                    <tbody>
                    {flights.map((flight) => (
                        <tr key={flight.flightID}>
                            <td>{flight.flightID}</td>
                            <td>{flight.departCity}</td>
                            <td>{flight.arriveCity}</td>
                            <td>{flight.flightDate}</td>
                            <td>
                                <button onClick={() => openEditModal(flight)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* Edit Flight Modal */}
            {editModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Flight</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="editDepartCity">Departure City:</label>
                                <input
                                    type="text"
                                    id="editDepartCity"
                                    name="editDepartCity"
                                    value={editedFlight.departCity}
                                    onChange={(e) =>
                                        setEditedFlight({
                                            ...editedFlight,
                                            departCity: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="editArriveCity">Arrival City:</label>
                                <input
                                    type="text"
                                    id="editArriveCity"
                                    name="editArriveCity"
                                    value={editedFlight.arriveCity}
                                    onChange={(e) =>
                                        setEditedFlight({
                                            ...editedFlight,
                                            arriveCity: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="editFlightDate">Flight Date:</label>
                                <input
                                    type="date"
                                    id="editFlightDate"
                                    name="editFlightDate"
                                    value={editedFlight.flightDate}
                                    onChange={(e) =>
                                        setEditedFlight({
                                            ...editedFlight,
                                            flightDate: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <button type="button" onClick={handleFlightUpdate}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="card">
                <h2>All Aircraft</h2>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>Aircraft ID</th>
                        <th>Type</th>
                        {/* Add more table headers as needed */}
                    </tr>
                    </thead>
                    <tbody>
                    {aircraftList.map(aircraft => (
                        <tr key={aircraft.aircraftID}>
                            <td>{aircraft.aircraftID}</td>
                            <td>{aircraft.aircraftType}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h2>Options</h2>
                <button onClick={() => toggleForm('addPlane')} className="btn">
                    Add Aircraft
                </button>
                <button onClick={() => toggleForm('removePlane')} className="btn">
                    Remove Aircraft
                </button>
                <button onClick={() => toggleForm('addCrew')} className="btn">
                    Add Crew
                </button>
                <button onClick={() => toggleForm('removeCrew')} className="btn">
                    Remove Crew
                </button>
                <button onClick={toggleRegisteredUsersList} className="btn">
                    {registeredUsersVisible ? "Hide" : "Print"} Registered User List
                </button>

                {registeredUsersVisible && registeredUsers.length > 0 && (
                    <div className="card">
                        <h2>Registered Users</h2>
                        <ul>
                            {registeredUsers.map(user => (
                                <li key={user.userID}>
                                    <strong>User ID:</strong> {user.userID}<br />
                                    <strong>Email:</strong> {user.email}<br />
                                    <strong>First Name:</strong> {user.firstName}<br />
                                    <strong>Last Name:</strong> {user.lastName}<br />
                                    <br />
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {renderForm()}

        </div>
    );


}

export default AdminHome