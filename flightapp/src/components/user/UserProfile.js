import React, { useState } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/Home');
    };
    const showCCAlert = () => {
        alert("You Have Successfully Applied for the Credit Card!");
    };

    const showPromoAlert = () => {
        alert("You Have Subscribed for the Monthly Promotions!");
    };

    const showCompanionAlert = () => {
        alert("You Have Successfully Claimed Your Companion Ticket!");
    };

    return (
        <div>
            <div className="navbar">
                <h1>User Profile</h1>
                <button onClick={() => { handleHomeButton() }} className="btn">Home</button>
            </div>
            <div className="card" id="profile">
                <div className="flex-container">
                    <div className="user-details">
                        <h2>User Details</h2>
                        <h3>First Name: John</h3>
                        <h3>Last Name: Doe</h3>
                        <h3>Email: john@gmail.com</h3>
                    </div>
                    <div className="options">
                        <h2>Options</h2>
                        <button onClick={showCCAlert} className="btn">Apply For Credit Card</button>
                        <button onClick={showPromoAlert} className="btn">Opt-in For Monthly Promotions</button>
                        <button onClick={showCompanionAlert} className="btn">Claim Companion Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;