import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { readRestaurant,deleteRestaurant } from './RestaurantSlice';
import RestaurantComponent from './RestaurantComponent';

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { list: restaurants, status, error } = useSelector((state) => state.restaurant);

  const [modalShow, setModalShow] = useState(false);
  const [selectedrestaurant, setSelectedrestaurant] = useState(null);

  useEffect(() => {
    dispatch(readRestaurant());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedrestaurant(null);
    setModalShow(true);
  };

  const handleEditClick = (restaurant) => {
    setSelectedrestaurant(restaurant);
    setModalShow(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this Restaurant?')) {
      dispatch(deleteRestaurant(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>restaurants List</h2>
      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Add Restaurant
      </Button>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {restaurants && restaurants.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Country</th>
              <th>City</th>
              <th>Phone Number</th>
              <th>Meals</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>{restaurant.id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.desc}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.country}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.phoneNumber}</td>
                <td>{restaurant.meals}</td>
                <td>
                  {restaurant.image ? (
                    <Image
                      src={`http://localhost:5234/Images/Car/${restaurant.image}`}
                      alt={restaurant.name}
                      thumbnail
                      style={{ maxWidth: '100px', maxHeight: '80px' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(restaurant)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(restaurant.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        status !== 'loading' && <p>No restaurants found.</p>
      )}

      {/* Add/Edit Modal */}
      {modalShow && (
        <RestaurantComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          restaurant={selectedrestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantList;
