import React, { useState } from 'react';
import axios from 'axios';

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
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="text" name="street" value={customer.address.street} onChange={handleAddressChange} placeholder="Street" />
        <input type="text" name="zip" value={customer.address.zip} onChange={handleAddressChange} placeholder="ZIP Code" />
        <input type="text" name="city" value={customer.address.city} onChange={handleAddressChange} placeholder="City" />
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
