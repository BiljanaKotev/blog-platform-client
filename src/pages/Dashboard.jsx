import React, { useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // const storedToken = localStorage.getItem('authToken');

    axios
      .get(`${API_URL}/dashboard`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>{user.name}'s Dashboard</h1>
      <div>
        <h2>Blog Posts:</h2>
      </div>
    </main>
  );
}

export default Dashboard;
