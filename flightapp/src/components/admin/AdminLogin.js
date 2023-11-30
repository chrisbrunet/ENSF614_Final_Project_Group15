import React from 'react';
import '../css/styles.css';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
    };


    const handleLoginButton = (e) => {
        navigate('/AdminHome');
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
                <form onSubmit={handleLoginButton}>
                    <div className="input-group">
                        <label htmlFor="username">Username or Email:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;