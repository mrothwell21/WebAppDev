import { Link } from 'react-router-dom';
import React from 'react';

function ChangePassword() {
    return (
        <div className="window">
            <div className="window-header">Change Password</div>
            <div className="password-container">
        <form action="#" method="POST">
            <div className="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required disabled/>
            </div>

            <div className="form-group">
                <label for="current-password">Current Password:</label>
                <input type="password" id="current-password" name="current-password" required/>
            </div>

            <div className="form-group">
                <label for="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" required/>
            </div>

            <div className="form-group">
                <label for="confirm-password">Retype New Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" required/>
            </div>

            <button type="submit" id="submit">Submit</button>
        </form>
            <p>
                <button type="button" id="back">Back</button>
            </p>
        </div>
    </div>
    );
}

export default ChangePassword;