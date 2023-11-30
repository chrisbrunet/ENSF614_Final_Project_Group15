import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
const LoginRegisterPage = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };

    const handleLoginButton = () => {
        navigate('/UserProfile');
    };

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const toggleLoginForm = (formType) => {
        setShowLoginForm(formType === 'login');
        setShowRegisterForm(formType === 'register');
    };

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        dob: '',
        email: '',
        regPassword: ''
    });



    const handleRegister = (e) => {
        e.preventDefault();
        alert('You Have Successfully Registered as a Member!');
    };

    return (
        <div>
            <div className="navbar">
                <h1>User Login/Register</h1>
                <button onClick={() => { handleHomeButton() }} className="btn">Home</button>
            </div>
            <div className="card">
                <button onClick={() => toggleLoginForm('login')} className="btn">Login</button>
                <button onClick={() => toggleLoginForm('register')} className="btn">Register</button>
            </div>

            <div className="card" style={{ display: showLoginForm ? 'block' : 'none' }}>
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
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>

            <div className="card" style={{ display: showRegisterForm  ? 'block' : 'none' }}>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}

                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={userDetails.address}
                            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}

                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={userDetails.dob}
                            onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}

                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}

                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="regPassword">Password:</label>
                        <input
                            type="password"
                            id="regPassword"
                            name="regPassword"
                            value={userDetails.regPassword}
                            onChange={(e) => setUserDetails({ ...userDetails, regPassword: e.target.value })}

                            required
                        />
                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>



    );
};

export default LoginRegisterPage