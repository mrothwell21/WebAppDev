import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = ({ role, onLogout }) => {
  // Common links for all roles
  const commonLinks = [
    { path: '/home', label: 'Home' },
  ];

  // Role-specific links
  const roleSpecificLinks = {
    admin: [
      { path: '/add-user', label: 'Add User' },
      { path: '/delete-user', label: 'Delete User' },
      { path: '/edit-user', label: 'Edit User' },
    ],
    teacher: [
      { path: '/create-course', label: 'Create Course' },
      { path: '/update-course', label: 'Update Course' },
      { path: '/activate-course', label: 'Activate Course' },
      { path: '/your-courses', label: 'Your Courses' },
    ],
    student: [
      { path: '/register', label: 'Register' },
      { path: '/drop', label: 'Drop' },
      { path: '/courses', label: 'Courses' },
    ],
  };

  return (
    <Navbar bg="green" varient="dark" expand="{false}" className="px-3">
    <div className="d-flex w-100 justify-content-between align-items-center">
        <span className="navbar-brand mb-0">{role.charAt(0).toUpperCase() + role.slice(1)} Landing</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto"/>
    </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {/* Render common links */}
          {commonLinks.map((link) => (
            <Nav.Link key={link.path} href={link.path}>
              {link.label}
            </Nav.Link>
          ))}

          {/* Render role-specific links */}
          {roleSpecificLinks[role]?.map((link) => (
            <Nav.Link key={link.path} href={link.path}>
              {link.label}
            </Nav.Link>
          ))}

        <Nav.Link onClick={onLogout}>
            Logout
        </Nav.Link>

          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;