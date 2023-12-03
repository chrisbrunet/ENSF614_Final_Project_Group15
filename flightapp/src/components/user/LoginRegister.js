import React, { useState, useEffect, useContext   } from 'react';
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../../context/AppContext';
const LoginRegisterPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
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

    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });


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

    const handleRegister  = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/registered_user/new_user', {
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            birthdate: birthdate,
            password: password
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                setRegistrationSuccess(true);
            } else {
                alert(response.data);
            }
        })
            .catch((error) => {
                console.error("Error during registration:", error);
                alert("Registration failed. See console for details.");
            });
    };
    useEffect(() => {
        if (registrationSuccess) {
            navigate('/UserProfile');
        }
    }, [registrationSuccess, navigate]);

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

            <div className="card" style={{ display: showRegisterForm ? 'block' : 'none' }}>
                <h2>Register</h2>
                <form >
                    <div className="input-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="regPassword">Password:</label>
                        <input
                            type="password"
                            id="regPassword"
                            name="regPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" className="btn" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>



    );
};

export default LoginRegisterPage