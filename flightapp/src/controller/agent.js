import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAgent = () => {

        const navigate = useNavigate();

        const [loginDetails, setLoginDetails] = useState({
            email: "",
            password: ""
        });

        const login = () => {
            axios.get("http://localhost:3001/api/airline_agent/get_user", {
            params: loginDetails
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.length === 1) {
                    handleAgentLoginButton();
                } else {
                    alert("Incorrect email or password");
                }
            })
            .catch((error) => {
                console.error("Error fetching login details:", error);
            });
        };

        const handleAgentLoginButton = () => {
            navigate('/agentHome');
        };

        return {
            login,
            loginDetails,
            setLoginDetails,
            handleAgentLoginButton
        };
    };