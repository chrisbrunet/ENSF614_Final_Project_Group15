import React from 'react';
import { Routes ,Route,Navigate } from 'react-router-dom';

import Home from '../user/Home';
import LoginRegisterPage from "../user/LoginRegister";
import UserProfile from "../user/UserProfile";
import AdminLogin from "../admin/AdminLogin";
import AdminHome from "../admin/AdminHome";
import SelectedFlight from "../user/SelectedFlight";
import ManageBooking from "../user/ManageBooking";
import AgentLogin from "../agent/AgentLogin";
import AgentHome from "../agent/AgentHome";
const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/userPortal" element={<LoginRegisterPage/>} />
            <Route exact path="/userProfile" element={<UserProfile/>} />
            <Route exact path="/adminHome" element={<AdminHome/>} />
            <Route exact path="/adminLogin" element={<AdminLogin/>} />
            <Route exact path="/selectFlight/:flightID" element={<SelectedFlight />} />            
            <Route exact path="/manageBooking" element={<ManageBooking/>} />
            <Route exact path="/agentLogin" element={<AgentLogin/>} />
            <Route exact path="/agentHome" element={<AgentHome/>} />

        </Routes>
    );
};

export default Navigation;