import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAdmin = () => {

        const navigate = useNavigate();

        const [loginDetails, setLoginDetails] = useState({
            email: "",
            password: ""
        });

        const login = () => {
            axios.get("http://localhost:3001/api/admin/get_user", {
            params: loginDetails
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.length === 1) {
                    handleAdminLoginButton();
                } else {
                    alert("Incorrect email or password");
                }
            })
            .catch((error) => {
                console.error("Error fetching login details:", error);
            });
        };

        const handleAdminLoginButton = (e) => {
            navigate('/AdminHome');
        };

        return {
            login,
            loginDetails,
            setLoginDetails,
            handleAdminLoginButton
        };
    };