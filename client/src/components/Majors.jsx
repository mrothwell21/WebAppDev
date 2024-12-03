import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';
import { useMajors } from '../hooks/getMajors';

const Majors = ({ role, majorList, onUpdateMajor }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [isAddingNewMajor, setIsAddingNewMajor] = useState(false);
  const [majorIdError, setMajorIdError] = useState('');
  const [formValues, setFormValues] = useState({
    majorId: '',
    name: '',
    prefix: '',
    description: ''
  });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { fetchMajors, checkMajorIdExists } = useMajors(); 

  const handleAddMajor = () => {
    setIsAddingNewMajor(true);
    setSelectedMajor(null);
    setFormValues({
      majorId: '',
      name: '',
      prefix: '',
      description: ''
    });
    setShowModal(true);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  useEffect(() => {
    if (selectedMajor && showModal) {
      const updatedMajor = majorList.find(major => major.majorId === selectedMajor.majorId);
      if (updatedMajor) {
        setFormValues({
          majorId: updatedMajor.majorId,
          name: updatedMajor.name,
          prefix: updatedMajor.prefix,
          description: updatedMajor.description
        });
        setSelectedMajor(updatedMajor);
      }
    }
  }, [majorList, selectedMajor, showModal]);

  const validateMajorId = async (id) => {
    if (!id) {
      setMajorIdError('Major ID is required');
      return false;
    }
    
    if (isAddingNewMajor && id) {
      const exists = await checkMajorIdExists(id);
      if (exists) {
        setMajorIdError('This Major ID already exists');
        return false;
      }
    }
    setMajorIdError('');
    return true;
  };


  // Open modal and populate form with selected major details
  const handleShowModal = (major) => {
    setSelectedMajor(major);
    setIsAddingNewMajor(false);
    setMajorIdError('')
    setFormValues({
      majorId: major?.majorId || '',
      name: major?.name || '',
      prefix: major?.prefix || '',
      description: major?.description || ''
    });
    setShowModal(true);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMajor(null);
    setUpdateError(null);
    setUpdateSuccess(false);
    setFormValues({
      majorId: '',
      name: '',
      prefix: '',
      description: ''
    });
  };

  // Handle form field changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'majorId') {
      await validateMajorId(value);
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = async () => {
    if (!selectedMajor && !isAddingNewMajor) return;

    if (isAddingNewMajor) {
      const isValid = await validateMajorId(formValues.majorId);
      if (!isValid) {
        return;
      }
    }

    const updatedFormValues = {
      ...formValues,
    };

    try {
      const success = await onUpdateMajor(selectedMajor?.majorId, updatedFormValues);
      
      if (success) {
        setUpdateSuccess(true);
        await fetchMajors();
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
      {role === 'admin' && (
        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" onClick={handleAddMajor}>
            Create Major
          </Button>
        </div>
      )}

      {/* Modal for viewing/editing major details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isAddingNewMajor ? 'Add New Major' : 'Major Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Major ID</Form.Label>
              <Form.Control
                type="text"
                name="majorId"
                value={formValues.majorId || ''}
                onChange={handleChange}
                readOnly={role !== 'admin'}
                disabled={!isAddingNewMajor}
                isInvalid={!!majorIdError}
              />
              <Form.Control.Feedback type="invalid">
                  {majorIdError}
                </Form.Control.Feedback>
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
               <Form.Control.Feedback type="invalid">
                  {majorIdError}
                </Form.Control.Feedback>
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
            <Button 
              variant="primary" 
              onClick={handleStatusUpdate}
              disabled={updateSuccess}
            >
               {isAddingNewMajor ? 'Create Major' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Majors;
