import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';

const Majors = ({ role, majorList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [formValues, setFormValues] = useState({
    majorId: '',
    name: '',
    prefix: '',
    description: ''
  });

  // Open modal and populate form with selected major details
  const handleShowModal = (major) => {
    setSelectedMajor(major);
    setFormValues({
      majorId: major?.majorId || '',
      name: major?.name || '',
      prefix: major?.prefix || '',
      description: major?.description || ''
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMajor(null);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log(`Saving changes for major: ${formValues.name}`);
    handleCloseModal();
  };

  return (
    <div>
      <h5 className="text-center">Majors</h5>
      <ListGroup>
        {majorList.map((major, index) => (
          <ListGroup.Item
            key={major.majorId || index}
            action
            onClick={() => handleShowModal(major)} // Open form on click for both roles
            className="d-flex justify-content-between align-items-center list-group-item-action"
          >
            <div>
              {major.name} ({major.prefix})
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for viewing/editing major details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Major Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Major ID</Form.Label>
              <Form.Control
                type="text"
                name="majorId"
                value={formValues.majorId}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prefix</Form.Label>
              <Form.Control
                type="text"
                name="prefix"
                value={formValues.prefix}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formValues.description}
                onChange={handleChange}
                readOnly={role !== 'admin'}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {role === 'admin' && (
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Majors;
