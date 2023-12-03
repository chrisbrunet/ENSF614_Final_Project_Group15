import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export const useUser = () => {

    const navigate = useNavigate();

    // Attributes
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
    const [flightCriteria, setFlightCriteria] = useState({
        departCity: '',
        arriveCity: '',
        flightDate: '',
    });
    const [allFlights, setAllFlights] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { user, setUser } = useContext(AppContext);

    // Methods
    const login = () => {
        axios.get("http://localhost:3001/api/registered_user/get_user", {
          params: loginDetails
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.length === 1) {
                console.log(response)
                setUser({
                    ...user,
                    userId: response.data[0].email,
                    fname: response.data[0].firstName,
                    lname: response.data[0].lastName
                });
                handleLoginButton();
            } else {
                alert("Incorrect email or password");
            }
        })
        .catch((error) => {
            console.error("Error fetching login details:", error);
        });
    };

    const getAllFlights = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/all_flights");
            console.log(response.data);
            setAllFlights(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    };

    const searchFlights = () => {
        const filteredFlights = allFlights.filter((flight) => {
            const lowerDepartCity = flight.departCity.toLowerCase();
            const lowerArriveCity = flight.arriveCity.toLowerCase();
            const criteriaDepartCity = flightCriteria.departCity.toLowerCase();
            const criteriaArriveCity = flightCriteria.arriveCity.toLowerCase();
            const criteriaDate = flightCriteria.flightDate;

            const departCityMatches = lowerDepartCity.includes(criteriaDepartCity);
            const arriveCityMatches = lowerArriveCity.includes(criteriaArriveCity);

            const dateMatches = criteriaDate
                ? formatDateString(flight.flightDate) === flightCriteria.flightDate
                : true; 

            return departCityMatches && arriveCityMatches && dateMatches;
        });

        setSearchResults(filteredFlights);
    };

    const resetFilters = () => {
        setFlightCriteria({
            departCity: '',
            arriveCity: '',
            flightDate: '',
        });
        setSearchResults(allFlights);
    };

    const handleLoginButton = () => {
        navigate('/UserProfile');
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().substring(0, 10);
    };

    useEffect(() => {
        getAllFlights();
    }, []);

    return {
        flightCriteria,
        setFlightCriteria,
        allFlights,
        setAllFlights,
        searchResults,
        setSearchResults,
        getAllFlights,
        searchFlights,
        resetFilters,
        formatDateString,
        login,
        loginDetails,
        setLoginDetails
    };
};
