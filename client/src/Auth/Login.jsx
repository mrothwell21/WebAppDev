import React from 'react';

import { Link } from 'react-router-dom';

import useLogin from '../hooks/useLogin';
import '../../public/css/login.css'

const Login = () => {

    const { loginUser } = useLogin();

    const handleLogin = async (event) => {
        event.preventDefault();

        const form = event.target;

        const values = {
            user     : form.username.value,
            password : form.password.value
        };

        await loginUser(values);
    };

    return (
        <div>
            <div className="logoContainer">
                <img 
                    src="images/SUNY_Brockport_Logo.png" 
                    alt="SUNY Brockport Logo"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '200px',  // Adjust size as needed
                        marginBottom: '20px'
                    }}
                />
            </div>
            <hr />
            <div className="loginContainer">
                <h2>SUNY Brockport Course Registration</h2>
                <h3>Sign In</h3>
                <form id="loginForm" method="post" autoComplete="off" onSubmit={handleLogin}>
                    <p>
                        <label htmlFor="username">Username:</label>
                        <br/>
                        <input type="text" name="username" id="username" placeholder="username"/>
                            <span id="usernameError"></span>
                    </p>
                    <p>
                        <label htmlFor="password">Password:</label>
                        <br/>
                        <input type="password" name="password" id="password" size="16" maxLength="16" placeholder="password"/>
                        <span id="passwordError"></span>
                    </p>
                    <p>
                        <button type="submit">Login</button>
                    </p>
                </form>
                <p style={{ fontSize: "12px" }} ><a href="">Forgot Password</a></p>
                <p id="status"></p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        </div>
    );
 }
 
 export default Login;