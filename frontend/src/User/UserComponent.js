import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser, updateUserDetails } from './UserSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserComponent = ({ show, onHide, user = null }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        dob: user.dob || ''
      });
    } else {
      setUserData({
        name: '',
        email: '',
        password: '',
        dob: ''
      });
    }
    setValidationErrors({});
  }, [user, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!userData.name.trim()) errors.name = 'Name is required';
    if (!userData.email.trim()) errors.email = 'Email is required';
    if (!userData.password.trim()) errors.password = 'Password is required';
    if (!userData.dob.trim()) errors.dob = 'Date of Birth is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const userPayload = {
    id:userData.id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    dob: userData.dob,
  };

  try {
    if (user) {
      //console.log("id from usercomponent is ",user.id);
      await dispatch(updateUserDetails({ id: user.id, userPayload }));
    } else {
      await dispatch(addUser(userPayload));
    }
    onHide();
  } catch (error) {
    console.error('Submit error:', error);
  }
};

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Update User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              isInvalid={!!validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              isInvalid={!!validationErrors.password}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="dob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              isInvalid={!!validationErrors.dob}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.dob}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {user ? 'Update User' : 'Add User'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserComponent;
