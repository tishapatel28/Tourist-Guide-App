import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addRestaurantbooking, updateRestaurantbookingDetails } from './RestaurantBookingSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantBookingComponent = ({ show, onHide, restaurantbooking = null }) => {
    const dispatch = useDispatch();

    const [restaurantbookingData, setRestaurantbookingData] = useState({
        restaurantID: '',
        userID: '',
        mealTime: '',
        totalPeople: '',
        bookingDate: '',
        mealDate: '',
        status: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (restaurantbooking) {
            setRestaurantbookingData({
                restaurantID: restaurantbooking.restaurantID || '',
                userID: restaurantbooking.userID || '',
                mealTime: restaurantbooking.mealTime || '',
                totalPeople: restaurantbooking.totalPeople || '',
                bookingDate: restaurantbooking.bookingDate || '',
                mealDate: restaurantbooking.mealDate || '',
                status: restaurantbooking.status || ''
            });
        } else {
            setRestaurantbookingData({
                restaurantID: '',
                userID: '',
                mealTime: '',
                totalPeople: '',
                bookingDate: '',
                mealDate: '',
                status: '',               
            });
        }
        setValidationErrors({});
    }, [restaurantbooking, show]);

    const handleChange = (e) => {
        const { restaurantID, value } = e.target;
        setRestaurantbookingData(prev => ({ ...prev, [restaurantID]: value }));
    };

    

    const validateForm = () => {
        const errors = {};
        if (!restaurantbookingData.restaurantID.trim()) errors.restaurantID = 'restaurantID is required';
        if (!restaurantbookingData.userID.trim()) errors.userID = 'userIDription is required';
        if (!restaurantbookingData.mealDate || isNaN(restaurantbookingData.mealDate)) errors.mealDate = 'Valid mealTime is required';
        if (!restaurantbookingData.mealTime.trim()) errors.mealTime = 'mealTime is required';
        if (!restaurantbookingData.totalPeople.trim()) errors.totalPeople = 'totalPeople is required';
        if (!restaurantbookingData.bookingDate.trim()) errors.bookingDate = 'bookingDate is required';
        if (!restaurantbookingData.mealDate.trim()) errors.mealDate = 'mealDate is required';
        if (!restaurantbookingData.status.trim()) errors.status = 'status is required';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formData = new FormData();
            formData.append('restaurantID', restaurantbookingData.restaurantID);
            formData.append('userID', restaurantbookingData.userID);
            formData.append('mealTime', restaurantbookingData.mealTime);
            formData.append('totalPeople', restaurantbookingData.totalPeople);
            formData.append('bookingDate', restaurantbookingData.bookingDate);
            formData.append('mealDate', restaurantbookingData.mealDate);
            formData.append('status', restaurantbookingData.status);
          

            if (restaurantbooking) {
                await dispatch(updateRestaurantbookingDetails({ id: restaurantbooking.id, formData }));
            } else {
                await dispatch(addRestaurantbooking(formData));
            }
            onHide();
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{restaurantbooking ? 'Update restaurantbooking' : 'Add restaurantbooking'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingrestaurantID">
                        <Form.Label>restaurantID</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="restaurantID"
                            value={restaurantbookingData.restaurantID}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.restaurantID}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.restaurantID}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookinguserID">
                        <Form.Label>userIDription</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="userID"
                            value={restaurantbookingData.userID}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.userID}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.userID}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingmealTime">
                        <Form.Label>mealTime</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="mealTime"
                            value={restaurantbookingData.mealTime}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.mealTime}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.mealTime}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingtotalPeople">
                        <Form.Label>totalPeople</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="totalPeople"
                            value={restaurantbookingData.totalPeople}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.totalPeople}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.totalPeople}</Form.Control.Feedback>
                    </Form.Group>
                                
                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingbookingDate">
                        <Form.Label>bookingDate</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="bookingDate"
                            value={restaurantbookingData.bookingDate}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.bookingDate}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.bookingDate}</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingmealDate">
                        <Form.Label>mealDate</Form.Label>
                        <Form.Control
                            type="number"
                            restaurantID="mealDate"
                            value={restaurantbookingData.mealDate}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.mealDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.mealDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group classrestaurantID="mb-3" controlId="restaurantbookingstatus">
                        <Form.Label>status</Form.Label>
                        <Form.Control
                            type="text"
                            restaurantID="status"
                            value={restaurantbookingData.status}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.status}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.status}
                        </Form.Control.Feedback>
                    </Form.Group>                                                   

                    <Button variant="primary" type="submit">
                        {restaurantbooking ? 'Update restaurantbooking' : 'Add restaurantbooking'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RestaurantBookingComponent;
