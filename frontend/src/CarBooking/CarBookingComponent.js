import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCarbooking, updateCarbooking } from './CarBookingSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarBookingComponent = ({ show, onHide, carbooking = null }) => {
    const dispatch = useDispatch();

    const [carbookingData, setcarbookingData] = useState({
        userID: '',
        carID: '',
        pickup_Location_Id: '',
        return_Location_Id: '',
        pickupDate: '',
        returnDate: '',
        bookingDate: '',
        rental_days: '',
        totalAmount: '',
        status: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (carbooking) {
            setcarbookingData({
                userID: carbooking.userID || '',
                carID: carbooking.carID || '',
                pickup_Location_Id: carbooking.pickup_Location_Id || '',
                return_Location_Id: carbooking.return_Location_Id || '',
                pickupDate: carbooking.pickupDate || '',
                returnDate: carbooking.returnDate || '',
                bookingDate: carbooking.bookingDate || '',
                rental_days: carbooking.rental_days || '',
                totalAmount: carbooking.totalAmount || '',
                status: carbooking.status || ''
            });
        } else {
            setcarbookingData({
                userID: '',
                carID: '',
                pickup_Location_Id: '',
                return_Location_Id: '',
                pickupDate: '',
                returnDate: '',
                bookingDate: '',
                rental_days: '',
                totalAmount: '',
                status: ''
            });
        }
        setValidationErrors({});
    }, [carbooking, show]);

    const handleChange = (e) => {
        const { userID, value } = e.target;
        setcarbookingData(prev => ({ ...prev, [userID]: value }));
    };



    const validateForm = () => {
        const errors = {};
        if (!carbookingData.userID.trim()) errors.userID = 'UserID is required';
        if (!carbookingData.carID.trim()) errors.carID = 'CarID is required';
        if (!carbookingData.pickup_Location_Id.trim()) errors.pickup_Location_Id = 'pickup_Location_Id is required';
        if (!carbookingData.return_Location_Id.trim()) errors.return_Location_Id = 'return_Location_Id is required';
        if (!carbookingData.pickupDate.trim()) errors.pickupDate = 'pickupDate is required';
        if (!carbookingData.returnDate.trim()) errors.returnDate = 'returnDate is required';
        if (!carbookingData.bookingDate.trim()) errors.bookingDate = 'bookingDate is required';
        if (!carbookingData.rental_days.trim()) errors.rental_days = 'Rental Day is required';
        if (!carbookingData.totalAmount.trim()) errors.totalAmount = 'Total Amount is required';
        if (!carbookingData.status.trim()) errors.status = 'Status is required';

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            try {
                const formData = new FormData();
                formData.append('userID', carbookingData.userID);
                formData.append('carID', carbookingData.carID);
                formData.append('pickup_Location_Id', carbookingData.pickup_Location_Id);
                formData.append('return_Location_Id', carbookingData.return_Location_Id);
                formData.append('pickupDate', carbookingData.pickupDate);
                formData.append('returnDate', carbookingData.returnDate);
                formData.append('bookingDate', carbookingData.bookingDate);
                formData.append('rental_days', carbookingData.rental_days);
                formData.append('totalAmount', carbookingData.totalAmount);
                formData.append('status', carbookingData.status);

                if (carbooking) {
                    await dispatch(updateCarbooking({ id: carbooking.id, formData }));
                } else {
                    await dispatch(addCarbooking(formData));
                }
                onHide();
            } catch (error) {
                console.error('Submit error:', error);
            }
        };

        return (
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{carbooking ? 'Update carbooking' : 'Add carbooking'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                        <Form.Group classuserID="mb-3" controlId="carbookinguserID">
                            <Form.Label>userID</Form.Label>
                            <Form.Control
                                type="text"
                                userID="userID"
                                value={carbookingData.userID}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.userID}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.userID}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group classuserID="mb-3" controlId="carbookingcarID">
                            <Form.Label>carIDription</Form.Label>
                            <Form.Control
                                type="text"
                                userID="carID"
                                value={carbookingData.carID}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.carID}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.carID}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group classuserID="mb-3" controlId="carbookingpickup_Location_Id">
                            <Form.Label>pickup_Location_Id</Form.Label>
                            <Form.Control
                                type="text"
                                userID="pickup_Location_Id"
                                value={carbookingData.pickup_Location_Id}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.pickup_Location_Id}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.pickup_Location_Id}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group classuserID="mb-3" controlId="carbookingreturn_Location_Id">
                            <Form.Label>return_Location_Id</Form.Label>
                            <Form.Control
                                type="text"
                                userID="return_Location_Id"
                                value={carbookingData.return_Location_Id}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.return_Location_Id}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.return_Location_Id}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group classuserID="mb-3" controlId="carbookingpickupDate">
                            <Form.Label>pickupDate</Form.Label>
                            <Form.Control
                                type="text"
                                userID="pickupDate"
                                value={carbookingData.pickupDate}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.pickupDate}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.pickupDate}</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group classuserID="mb-3" controlId="carbookingreturnDate">
                            <Form.Label>returnDate</Form.Label>
                            <Form.Control
                                type="number"
                                userID="returnDate"
                                value={carbookingData.returnDate}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.returnDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.returnDate}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group classuserID="mb-3" controlId="carbookingbookingDate">
                            <Form.Label>bookingDate</Form.Label>
                            <Form.Control
                                type="text"
                                userID="bookingDate"
                                value={carbookingData.bookingDate}
                                onChange={handleChange}
                                isInvalid={!!validationErrors.bookingDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.bookingDate}
                            </Form.Control.Feedback>
                        </Form.Group>

                       
                           

                        <Button variant="primary" type="submit">
                            {carbooking ? 'Update carbooking' : 'Add carbooking'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    };
}
export default CarBookingComponent;
