import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addRestaurant,updateRestaurantDetails } from './RestaurantSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantComponent = ({ show, onHide, restaurant = null }) => {
  const dispatch = useDispatch();

  const [restaurantData, setRestaurantData] = useState({
    name: '',
    desc: '',
    address: '',
    country: '',
    city: '',
    phoneNumber: '',
    meals:'',
    image: '',
    newImageFile: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (restaurant) {
      setRestaurantData({
        name: restaurant.name || '',
        desc: restaurant.desc || '',
        address: restaurant.address || '',
        country: restaurant.country || '',
        city: restaurant.city || '',
        phoneNumber: restaurant.phoneNumber || '',
        meals:restaurant.meals||'',
        image: restaurant.image || '',
        newImageFile: null,
      });
    } else {
      setRestaurantData({
        name: '',
        desc: '',
        address: '',
        country: '',
        city: '',
        phoneNumber: '',
        image: '',
        newImageFile: null,
      });
    }
    setValidationErrors({});
  }, [restaurant, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRestaurantData(prev => ({
      ...prev,
      newImageFile: file,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!restaurantData.name.trim()) errors.name = 'Name is required';
    if (!restaurantData.desc.trim()) errors.desc = 'Description is required';
    if (!restaurantData.phoneNumber || isNaN(restaurantData.phoneNumber)) errors.phoneNumber = 'Valid address is required';
    if (!restaurantData.address.trim()) errors.address = 'Address is required';
    if (!restaurantData.country.trim()) errors.country = 'Country is required';
    if (!restaurantData.city.trim()) errors.city = 'City is required';
      if (!restaurantData.phoneNumber.trim()) errors.phoneNumber = 'phoneNumber is required';
         if (!restaurantData.meals.trim()) errors.meals = 'Meals is required';
    if (!restaurant && !restaurantData.newImageFile) errors.image = 'Image is required for new restaurant';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', restaurantData.name);
      formData.append('desc', restaurantData.desc);
      formData.append('address', restaurantData.address);
      formData.append('country', restaurantData.country);
      formData.append('city', restaurantData.city);
      formData.append('phoneNumber', restaurantData.phoneNumber);
      formData.append('meals', restaurantData.meals);

      if (restaurantData.newImageFile) {
        formData.append('image', restaurantData.newImageFile);
      }

      if (restaurant) {
        await dispatch(updateRestaurantDetails({ id: restaurant.id, formData }));
      } else {
        await dispatch(addRestaurant(formData));
      }
      onHide();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{restaurant ? 'Update restaurant' : 'Add restaurant'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <Form.Group className="mb-3" controlId="restaurantName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={restaurantData.name}
              onChange={handleChange}
              isInvalid={!!validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="restaurantDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              value={restaurantData.desc}
              onChange={handleChange}
              isInvalid={!!validationErrors.desc}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.desc}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="restaurantaddress">
            <Form.Label>address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={restaurantData.address}
              onChange={handleChange}
              isInvalid={!!validationErrors.address}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.address}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="restaurantCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={restaurantData.country}
              onChange={handleChange}
              isInvalid={!!validationErrors.country}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.country}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="restaurantCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={restaurantData.city}
              onChange={handleChange}
              isInvalid={!!validationErrors.city}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.city}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="restaurantphoneNumber">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control
              type="number"
              name="phoneNumber"
              value={restaurantData.phoneNumber}
              onChange={handleChange}
              isInvalid={!!validationErrors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

            <Form.Group className="mb-3" controlId="restaurantmeals">
            <Form.Label>Meals</Form.Label>
            <Form.Control
              type="text"
              name="meals"
              value={restaurantData.meals}
              onChange={handleChange}
              isInvalid={!!validationErrors.meals}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.meals}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="restaurantImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              isInvalid={!!validationErrors.image}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.image}</Form.Control.Feedback>

            <div className="mt-3">
              {restaurantData.newImageFile ? (
                <Image
                  src={URL.createObjectURL(restaurantData.newImageFile)}
                  alt="New Preview"
                  thumbnail
                  style={{ maxHeight: '150px' }}
                />
              ) : restaurantData.existingImage ? (
                <Image
                  src={`http://localhost:5234/Images/restaurant/${restaurantData.image}`}
                  alt="Current"
                  thumbnail
                  style={{ maxHeight: '150px' }}
                />
              ) : null}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            {restaurant ? 'Update restaurant' : 'Add restaurant'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RestaurantComponent;
