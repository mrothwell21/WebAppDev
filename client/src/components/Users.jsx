import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';

const Users = ({ role, userList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    courseId: '',
    firstName: '',
    lastName: '',
    username: '',
    role: '',
    phoneNumber: '',
    status: ''
  });

  // Open modal and populate form with selected course details
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setFormValues({
      userId: user?.id || '',
      firstname: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      role: user?.role || '',
      phoneNumber: user?.phoneNumber || '',
      status: user?.status
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = () => {
    console.log(`Updating user status for ${formValues.username}`);
    handleCloseModal();
  }


  return (
    <div>
      <h5 className="text-center">Users</h5>
      <ListGroup>
        {userList.map((user, index) => (
          <ListGroup.Item
            key={user.userId || index}
            action
            onClick={() => handleShowModal(user)} // Open form on click for both roles
            className="d-flex justify-content-between align-items-center list-group-item-action"
          >
    <div>
              {user.firstName} {user.lastName} ({user.username})
            </div>
            <div>
              <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                {user.status}
              </span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for viewing/editing user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={formValues.userId}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formValues.status}
                onChange={handleChange}
                disabled={role !== 'admin'}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {role === 'admin' && (
            <Button variant="primary" onClick={handleStatusUpdate}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;