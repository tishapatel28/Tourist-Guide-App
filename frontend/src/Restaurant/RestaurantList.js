import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Form,
  InputGroup,
  Image,
  Pagination,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { readRestaurant, deleteRestaurant } from './RestaurantSlice';
import RestaurantComponent from './RestaurantComponent';
import './RestaurantList.css'; // Optional if you want to style

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { list: restaurants = [], status, error } = useSelector(state => state.restaurant);

  const [modalShow, setModalShow] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(readRestaurant());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedRestaurant(null);
    setModalShow(true);
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalShow(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this Restaurant?')) {
      dispatch(deleteRestaurant(id));
    }
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city?.toLowerCase().includes(search.toLowerCase()) ||
    r.country?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <Container fluid className="py-4">
    <br/><br/><br/>

      <Row className="align-items-center mb-3">
        <Col md={6}  >
          <InputGroup>
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control
              placeholder="Search by name, city or country..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
          />
          </InputGroup>
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={handleAddClick} style={{marginLeft:'370px'}}>+ Add Restaurant</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table table table-striped className="shadow-sm">
            <thead >
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Phone</th>
                <th>Meals</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r, index) => (
                <tr key={r.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.desc}</td>
                  <td>{r.address}</td>
                  <td>{r.city}</td>
                  <td>{r.country}</td>
                  <td>{r.phoneNumber}</td>
                  <td>{r.meals}</td>
                  <td>
                    {r.image ? (
                      <Image
                        src={`http://localhost:5234/Images/Car/${r.image}`}
                        alt={r.name}
                        thumbnail
                        style={{ maxWidth: '80px' }}
                      />
                    ) : 'No Image'}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditClick(r)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(r.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <small className="text-muted">
            Showing {paginated.length} out of {filtered.length} entries
          </small>
        </Col>
        <Col xs="auto">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Col>
      </Row>

      {modalShow && (
        <RestaurantComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          restaurant={selectedRestaurant}
        />
      )}
    </Container>
  );
};

export default RestaurantList;
