import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';
import { useUsers } from '../hooks/getUsers';

const Users = ({ role, userList, onUpdateUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    courseId: '',
    firstName: '',
    lastName: '',
    username: '',
    role: '',
    phoneNumber: '',
    status: 'inactive'
  });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { fetchUsers } = useUsers(); 

  const userRoleToNumber = {
    'Admin': 1,
    'Teacher': 2,
    'Student': 3
  };

  const userRoleToString = {
    1: 'Admin',
    2: 'Teacher',
    3: 'Student'
  };

  const getRoleString = (roleNumber) => {
    return userRoleToString[roleNumber] || '';
  };

  useEffect(() => {
    if (selectedUser && showModal) {
      const updatedUser = userList.find(user => user.userId === selectedUser.userId);
      if (updatedUser) {
        setFormValues({
          userId: updatedUser.userId || '',
          firstName: updatedUser.firstName || '',
          lastName: updatedUser.lastName || '',
          username: updatedUser.username || '',
          role: getRoleString(updatedUser.role)|| '',
          phoneNumber: updatedUser.phoneNumber || '',
          status: updatedUser.status.toLowerCase()
        });
        setSelectedUser(updatedUser);
      }
    }
  }, [userList, selectedUser, showModal]);

  // Open modal and populate form with selected course details
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setFormValues({
      userId: user?.userId || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      role: getRoleString(user?.role) || '',
      phoneNumber: user?.phoneNumber || '',
      status: user?.status || 'inactive'
    });
    setShowModal(true);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setUpdateError(null);
    setUpdateSuccess(false);
    setFormValues({
      courseId: '',
      firstName: '',
      lastName: '',
      username: '',
      role: '',
      phoneNumber: '',
      status: 'inactive'
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const handleStatusUpdate = async () => {
    if (!selectedUser) return;

    const updatedFormValues = {
      ...formValues,
      username: formValues.username.trim(),
      role: userRoleToNumber[formValues.role],
      status: formValues.status// Convert string back to number
    };

    try {
      const success = await onUpdateUser(selectedUser.userId, updatedFormValues);
      
      if (success) {
        setUpdateSuccess(true);
        
        await fetchUsers();

        setTimeout(() => {
          handleCloseModal();
        }, 1000);
      }
    } catch (error) {
      setUpdateError('Failed to update user. Please try again.');
    }
  };


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
              <span className={`badge ${user.status.toLowerCase() === 'active' ? 'bg-success' : 'bg-danger'}`}>
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
                value={formValues.userId || ''} 
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formValues.firstName || ''}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formValues.lastName || ''}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formValues.username || ''}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formValues.role || '3'}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber || ''}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formValues.status || 'inactive'}
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
            <Button 
              variant="primary" 
              onClick={handleStatusUpdate}
              disabled={updateSuccess}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;