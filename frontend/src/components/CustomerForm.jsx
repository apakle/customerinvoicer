import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
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
    axios.post('http://localhost:8080/api/customers', customer)
      .then(response => {
        console.log('Customer created:', response.data);
        setCustomer({ firstName: '', lastName: '', address: { street: '', zip: '', city: '' } });
        navigate('/customers');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Create Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} className="form-control" placeholder="First Name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} className="form-control" placeholder="Last Name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input type="text" name="street" value={customer.address.street} onChange={handleAddressChange} className="form-control" placeholder="Street" required />
          </div>
          <div className="mb-3">
            <label className="form-label">ZIP Code</label>
            <input type="text" name="zip" value={customer.address.zip} onChange={handleAddressChange} className="form-control" placeholder="ZIP Code" required />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" name="city" value={customer.address.city} onChange={handleAddressChange} className="form-control" placeholder="City" required />
          </div>
          <button type="submit" className="btn btn-primary">Create Customer</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
