import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = ({ role, onLogout }) => {
  // Common links for all roles
  const commonLinks = [
    { path: `/dashboard-${role}`, label: 'Home' },
  ];

  // Role-specific links
  const roleSpecificLinks = {
    admin: [
      { path: '/list-users', label: 'View Users' },
      { path: '/list-majors', label: 'View Majors' },
    ],
    teacher: [
      { path: '/create-course', label: 'Create Course' },
      { path: '/update-course', label: 'Update Course' },
      { path: '/teacher-active-courses', label: 'Activate Course' },
      { path: '/your-courses', label: 'Your Courses' },
    ],
    student: [
      { path: '/student-courses', label: 'Courses' },
      { path: '/student-open-courses', label: 'Register' },
      { path: '/student-enrolled-courses', label: 'Drop' },
    ],
  };

  return (
    <Navbar bg="green" variant="dark" expand="false" className="px-3">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span className="navbar-brand mb-0">
          {role.charAt(0).toUpperCase() + role.slice(1)} Landing
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {/* Render common links */}
          {commonLinks.map((link) => (
            <Nav.Link as={Link} key={link.path} to={link.path}
            style={{ color: 'white', transition: 'color 0.5s' }}
            onMouseEnter={(e) => (e.target.style.color = 'gray')}
            onMouseLeave={(e) => (e.target.style.color = 'white')}>
              {link.label}
            </Nav.Link>
          ))}

          {/* Render role-specific links */}
          {roleSpecificLinks[role]?.map((link) => (
            <Nav.Link as={Link} key={link.path} to={link.path} 
            style={{ color: 'white', transition: 'color 0.5s' }}
            onMouseEnter={(e) => (e.target.style.color = 'gray')}
            onMouseLeave={(e) => (e.target.style.color = 'white')}>
              {link.label}
            </Nav.Link>
          ))}

          {/* Logout link */}
          <Nav.Link as="button" onClick={onLogout} 
          style={{ color: 'white', transition: 'color 0.5s' }}
          onMouseEnter={(e) => (e.target.style.color = 'red')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
