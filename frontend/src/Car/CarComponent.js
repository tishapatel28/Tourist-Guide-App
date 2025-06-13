// src/components/CarComponent.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCar, updateCarDetails } from './CarSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarComponent = ({ show, onHide, car }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    country: '',
    city: '',
    seatingCapacity: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || '',
        desc: car.desc || '',
        price: car.price || '',
        country: car.country || '',
        city: car.city || '',
        seatingCapacity: car.seatingCapacity || '',
        image: car.image || null,
      });
    }
  }, [car]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.desc) newErrors.desc = 'Description is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.seatingCapacity || isNaN(formData.seatingCapacity)) {
      newErrors.seatingCapacity = 'Valid seating capacity is required';
    }
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const carData = new FormData();
      for (const key in formData) {
        carData.append(key, formData[key]);
      }

      if (car) {
        await dispatch(updateCarDetails({ id: car.id, formData: carData }));
        onHide();
      } else {
        await dispatch(addCar(carData));
         onHide();
      }

      //onHide(); // close modal
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              isInvalid={!!errors.country}
            />
            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formSeatingCapacity">
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
              isInvalid={!!errors.seatingCapacity}
            />
            <Form.Control.Feedback type="invalid">{errors.seatingCapacity}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            {formData.image && typeof formData.image === 'string' && (
              <Image
                src={`http://localhost:5234/Images/Car/${formData.image}`}
                alt={formData.name}
                thumbnail
                style={{ marginTop: '10px', maxWidth: '100px' }}
              />
            )}
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          isInvalid={!!errors.desc}
        />
        <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
      </Form.Group>
      <div className="text-center mt-3">
        <Button variant="primary" type="submit" >
          {car ? 'Update' : 'Add'} Car
        </Button>
      </div>
    </Form>

  );
};

export default CarComponent;
