import { Link } from 'react-router-dom';
import React from 'react';

function ForgotPassword() {
    return (
        <div className="window">
            <div className="window-header">Forgot Password</div>
            
            <p>Enter your username below and an admin will be in contact with you shortly.</p>

            <div  className="row">
                <input type="text" id="username" name="Username" required/>
                <button type="submit" id="submit">Submit</button>
            </div>
        </div>
    );
}

export default ForgotPassword;