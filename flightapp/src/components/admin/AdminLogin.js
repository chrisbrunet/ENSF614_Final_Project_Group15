import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminLoginPage = () => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
    };

    const handleAdminLoginButton = (e) => {
        navigate('/AdminHome');
    };

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

    return (
        <div>
            <div className="navbar">
                <h1>Admin Login</h1>
                <button onClick={handleHomeButton} className="btn">
                    Home
                </button>
            </div>

            <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleAdminLoginButton}>
                    <div className="input-group">
                        <label htmlFor="emailLogin">Email:</label>
                        <input  
                            type="text" 
                            id="emailLogin"  
                            value={loginDetails.email}
                            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} 
                            required  
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="passwordLogin">Password:</label>
                        <input 
                            type="password" 
                            id="passwordLogin"  
                            value={loginDetails.password}
                            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} 
                            required 
                        />
                    </div>
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); 
                            login();
                        }}
                        type="button"
                        className="btn"
                    >Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;