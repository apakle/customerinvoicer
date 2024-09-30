import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetailsList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/api/userdetails`)
      .then(response => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [backendUrl]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  const handleAddUser = () => {
    navigate('/create-user');
  };

  const handleUpdate = (id) => {
    navigate(`/userdetails/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`${backendUrl}/api/userdetails/${id}`)
        .then(response => {
          console.log('User deleted:', response.status);
          setUserDetails(prevDetails => prevDetails.filter(user => user.id !== id)); // Remove deleted user from state
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error deleting user. Please try again.');
        });
    }
  };  

  const formatIBAN = (iban) => {
    return iban ? iban.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim() : ''; 
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <button type="button" className="btn btn-success" onClick={handleAddUser}>
            Benutzer hinzufügen
          </button>
        </h2>
      </div>
      <div className="list-group">
        {userDetails.map((user) => (
          <div key={user.id} className="list-group-item">
            <h5>{user.name}</h5>
            <p>
              <strong>Adresse:</strong> {user.address.street}, {user.address.zip} {user.address.city}<br />
              <strong>Telefon:</strong> {user.phoneNumber}<br />
              <strong>IBAN:</strong> {formatIBAN(user.iban)}<br />
              <strong>BIC:</strong> {user.bic}<br />
              <strong>Bank:</strong> {user.bank}<br />
              <strong>St.Nr.:</strong> {user.taxNumber}
            </p>
            <button onClick={() => handleUpdate(user.id)} className="btn btn-primary me-2">Updaten</button>
            <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Löschen</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsList;
