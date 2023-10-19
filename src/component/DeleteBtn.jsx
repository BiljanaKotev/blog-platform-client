import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './DeleteBtn.css';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api` || 'http://localhost:5005/api';

function DeleteBtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deletePost = (props) => {
    const token = localStorage.getItem('authToken');

    axios
      .delete(`${API_URL}/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error deleting the post:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <button className="delete-btn" onClick={deletePost}>
        Delete
      </button>
    </div>
  );
}

export default DeleteBtn;
