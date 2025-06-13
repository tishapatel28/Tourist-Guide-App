import React, { useEffect, useState } from 'react';
import { Button, Spinner, Card, Row, Col, Modal, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { readCar, deleteCar } from './CarSlice';
import CarComponent from './CarComponent';

const CarList = () => {
  const dispatch = useDispatch();
  const { list: cars, status, error } = useSelector((state) => state.car);

  const [modalShow, setModalShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(readCar());
  }, [dispatch]);



  const handleAddClick = () => {
    setSelectedCar(null);
    setModalShow(true);

  };

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setModalShow(true);
    console.log("button clicked");
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      dispatch(deleteCar(id));
    }
  };

  const handleClose = () => {
    setModalShow(false);
    //setSelectedCar(null); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  return (
    <div className="container mt-4">

      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Add Car
      </Button>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className='cardsec'>
        {currentCars.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={2.5} className="g-2" >


            {currentCars.map((car) => (
              <Col key={car.id}>
                <Card >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5234/Images/Car/${car.image}`}
                    alt={car.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>{car.desc}</Card.Text>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(car)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDeleteClick(car.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>



              </Col>
            ))}
          </Row>

        ) : (
          status !== 'loading' && <p>No cars found.</p>
        )}


        <Pagination className="mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCar ? 'Edit Car' : 'Add Car'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarComponent car={selectedCar} onHide={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CarList;

