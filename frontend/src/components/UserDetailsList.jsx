import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetailsList = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user details when the component mounts
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
    <div>
      <h2>User Details</h2>
      <ul>
        {userDetails.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong><br />
            Address: {user.address.street}, {user.address.zip} {user.address.city}<br />
            Phone: {user.phone}<br />
            Bank Account: {user.bankAccount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailsList;
