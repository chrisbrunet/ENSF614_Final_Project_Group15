import React from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../../controller/agent'
const AgentLogin = () => {

    const {
        login,
        loginDetails,
        setLoginDetails,
        handleAgentLoginButton
    } = useAgent();

    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/Home');
    };

    return (
        <div>
            <div className="navbar">
                <h1>Airline Agent Login</h1>
                <button onClick={() => { handleHomeButton() }} className="btn">
                    Home
                </button>
            </div>

            <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleAgentLoginButton}>
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

export default AgentLogin;
