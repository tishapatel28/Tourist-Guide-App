import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readLocation,deleteLocation } from './LocationSlice';
import LocationComponent from './LocationComponent';

const LocationList = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.location.list);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(readLocation());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      dispatch(deleteLocation(id));
    }
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedLocation(null);
    setShowModal(true);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleAdd}>Add Location</button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.city}</td>
              <td>{location.state}</td>
              <td>{location.country}</td>
              <td>{location.zip_code}</td>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleEdit(location)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(location.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <LocationComponent
          location={selectedLocation}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LocationList;
