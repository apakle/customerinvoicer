import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetailsList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="card">
      <div className="card-header">
        <h2>User Details</h2>
      </div>
      <div className="list-group">
        {userDetails.map((user) => (
          <div key={user.id} className="list-group-item">
            <h5>{user.name}</h5>
            <p>
              <strong>Address:</strong> {user.address.street}, {user.address.zip} {user.address.city}<br />
              <strong>Phone:</strong> {user.phoneNumber}<br />
              <strong>Bank Account:</strong> {user.bankAccount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsList;
