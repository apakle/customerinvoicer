import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetailsList = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/userdetails')
      .then(response => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>User Details</h2>
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
