import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLocation, updateLocationDetails } from './LocationSlice';

const LocationComponent = ({ location, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    latitude: '',
    longitude: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location) {
      setFormData({ ...location });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validate()) {
      if (location) {
        dispatch(updateLocationDetails({ id: location.id, formData }));
      } else {
        dispatch(addLocation(formData));
      }
      onClose();
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }} onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{location ? 'Edit Location' : 'Add Location'}</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {Object.keys(formData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.replace('_', ' ').toUpperCase()}</label>
                  <input
                    type="text"
                    className={`form-control ${errors[key] ? 'border-danger' : ''}`}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                  />
                  {errors[key] && <div className="text-danger">{errors[key]}</div>}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
