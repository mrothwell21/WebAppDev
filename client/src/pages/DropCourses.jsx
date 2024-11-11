import { Link } from 'react-router-dom';
import React from 'react';

function DropCourses() {
    return (
        <div className="window">
            <div className="window-header">Drop Courses</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Register</a>
                    <a href="#">Drop</a>
                    <a href="#">Courses</a>
                </nav>
                <h1>Select Courses to Drop</h1>

                <div className="courses">

                 <h2>Enrolled Course List</h2>

                 <ul></ul>

                </div>

                <button className="button">"Drop"</button>

            </div>
        </div>
    );
}
}

export default DropCourses;