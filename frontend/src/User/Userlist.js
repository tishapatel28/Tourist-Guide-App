import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { readUser, deleteUser } from '../User/UserSlice';
import UserComponent from './UserComponent';

const Userlist = () => {
  const dispatch = useDispatch();

  // Grab user slice safely without destructuring directly in the parameter
  const userState = useSelector((state) => state.user);

  // Destructure with defaults to prevent creating new objects every render
  const users = userState?.list ?? [];
  const status = userState?.status ?? 'idle';
  const error = userState?.error ?? null;

  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(readUser());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedUser(null);
    setModalShow(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>

      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Add User
      </Button>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {status === 'succeeded' && users.length === 0 && <p>No users found.</p>}

      {users.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.dob}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {modalShow && (
        <UserComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Userlist;
