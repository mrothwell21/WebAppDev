import { Link } from 'react-router-dom';
import React from 'react';

function UserRegistration() {
    return (
        <div className="window">
            <div className="window-header">User Registration</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Register</a>
                    <a href="#">Drop</a>
                    <a href="#">Courses</a>
                </nav>
                <h1>Select Courses</h1>

                <div className="courses">

                 <h2>Courses</h2>

                 <ul></ul>

                </div>

                <button class="button">Register</button>
                
            </div>
        </div>
    );
}
}

export default UserRegistration;