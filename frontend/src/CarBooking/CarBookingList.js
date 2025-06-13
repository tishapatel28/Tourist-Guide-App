import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { readCarbooking,deleteCarbooking } from './CarBookingSlice';
import carbookingComponent from './CarBookingComponent';

const CarBookingList = () => {
  const dispatch = useDispatch();
  const { list: carbookings, status, error } = useSelector((state) => state.carbooking);

  const [modalShow, setModalShow] = useState(false);
  const [selectedcarbooking, setSelectedcarbooking] = useState(null);

  useEffect(() => {
    dispatch(readCarbooking());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedcarbooking(null);
    setModalShow(true);
  };

  const handleEditClick = (carbooking) => {
    setSelectedcarbooking(carbooking);
    setModalShow(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this carbooking?')) {
      dispatch(deleteCarbooking(id));
    }
  };

  return (
    <div className="container mt-4">
     <br/> <h2>carbookings List</h2>
     <br/><br/>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {carbookings && carbookings.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserID</th>
              <th>CarID</th>
              <th>Pickup Location</th>
              <th>Return Location</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Booking Date</th>
              <th>Rental Days</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carbookings.map((carbooking) => (
              <tr key={carbooking.id}>
                <td>{carbooking.id}</td>
                <td>{carbooking.userID}</td>
                <td>{carbooking.carID}</td>
                <td>{carbooking.pickup_Location_Id}</td>
                <td>{carbooking.return_Location_Id}</td>
                <td>{carbooking.pickupDate}</td>
                <td>{carbooking.returnDate}</td>
                <td>{carbooking.bookingDate}</td>
                <td>{carbooking.rental_days}</td>
                <td>{carbooking.totalAmount}</td>
                <td>{carbooking.status}</td>
                <td>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(carbooking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        status !== 'loading' && <p>No carbookings found.</p>
      )}

      {/* Add/Edit Modal */}
      {modalShow && (
        <carbookingComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          carbooking={selectedcarbooking}
        />
      )}
    </div>
  );
};

export default CarBookingList;
