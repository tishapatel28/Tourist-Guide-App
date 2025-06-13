import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { readRestaurantbooking,deleteRestaurantbooking } from './RestaurantBookingSlice';
import RestaurantBookingComponent from './RestaurantBookingComponent';

const RestaurantBookingList = () => {
  const dispatch = useDispatch();
  const { list: restaurantbookings, status, error } = useSelector((state) => state.restaurantbooking);

  const [modalShow, setModalShow] = useState(false);
  const [selectedrestaurantbooking, setSelectedrestaurantbooking] = useState(null);

  useEffect(() => {
    dispatch(readRestaurantbooking());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedrestaurantbooking(null);
    setModalShow(true);
  };

  const handleEditClick = (restaurantbooking) => {
    setSelectedrestaurantbooking(restaurantbooking);
    setModalShow(true);
  };

  const handleDeleteClick = (id) => {
    console.log("deleted id is",id);
    if (window.confirm('Are you sure you want to delete this Booking?')) {
      dispatch(deleteRestaurantbooking(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>restaurantbookings List</h2>
      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Add Restaurantbooking
      </Button>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {restaurantbookings && restaurantbookings.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Restautant</th>
              <th>User</th>
              <th>Meal Time</th>
              <th>total People</th>
              <th>Booking Date</th>
              <th>Meal Date</th>
              <th>Status</th>          
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurantbookings.map((restaurantbooking) => (
              <tr key={restaurantbooking.restaurantBookingId}>
                <td>{restaurantbooking.restaurantBookingId}</td>
                <td>{restaurantbooking.restaurantID}</td>
                <td>{restaurantbooking.userID}</td>
                <td>{restaurantbooking.mealTime}</td>
                <td>{restaurantbooking.totalPeople}</td>
                <td>{restaurantbooking.bookingDate}</td>
                <td>{restaurantbooking.mealDate}</td>
                <td>{restaurantbooking.status}</td>
                
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(restaurantbooking)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(restaurantbooking.restaurantBookingId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        status !== 'loading' && <p>No Restaurant Booking found.</p>
      )}

      {/* Add/Edit Modal */}
      {modalShow && (
        <RestaurantBookingComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          restaurantbooking={selectedrestaurantbooking}
        />
      )}
    </div>
  );
};

export default RestaurantBookingList;
