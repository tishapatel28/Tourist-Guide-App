import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Url } from '../URL/Url';

const Register = ({ show, onHide }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = 'Name is required';
    if (!userData.email.trim()) newErrors.email = 'Email is required';
    if (!userData.password.trim()) newErrors.password = 'Password is required';
    if (!userData.dob.trim()) newErrors.dob = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(Url.Register, userData); // Replace with your API URL
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('user', JSON.stringify({ email: userData.email, token }));
        alert('Registration successful!');
        onHide(); // close modal
        navigate('/login'); // redirect to login
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert('Email already exists');
      } else {
        alert('Registration failed');
        console.error(error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              isInvalid={!!errors.dob}
            />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
