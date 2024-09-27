import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    address: {
      street: '',
      zip: '',
      city: ''
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${backendUrl}/api/customers`, customer)
      .then(response => {
        console.log('Customer created:', response.data);
        setCustomer({ firstName: '', lastName: '', address: { street: '', zip: '', city: '' } });
        navigate('/customers');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Neuen Kunden anlegen</h2>
      </div>
      <div className="card-body">        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Vorname</label>
              <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} className="form-control" placeholder="Vorname" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nachname</label>
              <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} className="form-control" placeholder="Nachname" required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label">Straße</label>
              <input type="text" name="street" value={customer.address.street} onChange={handleAddressChange} className="form-control" placeholder="Straße" required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Postleitzahl</label>
              <input type="text" name="zip" value={customer.address.zip} onChange={handleAddressChange} className="form-control" placeholder="PLZ" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Stadt</label>
              <input type="text" name="city" value={customer.address.city} onChange={handleAddressChange} className="form-control" placeholder="Stadt" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Erstelle Kunde</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
