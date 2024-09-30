import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetailsForm = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: {
      street: '',
      zip: '',
      city: ''
    },
    phoneNumber: '',
    iban: '',
    bic: '',
    bank: '',
    taxNumber: ''
  });

  const { id } = useParams(); // Get user ID from URL parameters (for editing)
  const navigate = useNavigate();

  // Fetch existing user details if we are editing (i.e., id is present)
  useEffect(() => {
    if (id) {
      axios.get(`${backendUrl}/api/userdetails/${id}`)
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [id, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing user with PUT request
      axios.put(`${backendUrl}/api/userdetails/${id}`, userDetails)
        .then(response => {
          console.log('User details updated:', response.data);
          navigate('/userdetails'); // Redirect to user list
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Create new user with POST request
      axios.post(`${backendUrl}/api/userdetails`, userDetails)
        .then(response => {
          console.log('User details created:', response.data);        
          navigate('/userdetails'); // Redirect to user list
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{id ? 'Benutzer bearbeiten' : 'Neuen Benutzer anlegen'}</h2>
      </div>
      <div className="card-body">        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                name="name" 
                value={userDetails.name} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Name" 
                required 
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label">Straße</label>
              <input 
                type="text" 
                name="street" 
                value={userDetails.address.street} 
                onChange={handleAddressChange} 
                className="form-control" 
                placeholder="Straße" 
                required 
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Postleitzahl</label>
              <input 
                type="text" 
                name="zip" 
                value={userDetails.address.zip} 
                onChange={handleAddressChange} 
                className="form-control" 
                placeholder="PLZ" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Stadt</label>
              <input 
                type="text" 
                name="city" 
                value={userDetails.address.city} 
                onChange={handleAddressChange} 
                className="form-control" 
                placeholder="Stadt" 
                required 
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Telefonnummer</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={userDetails.phoneNumber} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Telefonnummer" 
                required 
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">IBAN</label>
              <input 
                type="text" 
                name="iban" 
                value={userDetails.iban} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="IBAN"                  
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">BIC</label>
              <input 
                type="text" 
                name="bic" 
                value={userDetails.bic} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="BIC"                  
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Bank</label>
              <input 
                type="text" 
                name="bank" 
                value={userDetails.bank} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Bank"                  
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Steuernummer</label>
              <input 
                type="text" 
                name="taxNumber" 
                value={userDetails.taxNumber} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Steuernummer" 
              />
            </div>
          </div>

          <button type="submit" className='btn btn-primary'>
            {id ? 'Benutzer aktualisieren' : 'Erstelle Benutzer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
