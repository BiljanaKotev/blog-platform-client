import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './DeleteBtn.css';

const API_URL = 'http://localhost:5005';

function DeleteBtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deletePost = () => {
    const token = localStorage.getItem('authToken');

    axios
      .delete(`${API_URL}/api/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('Post deleted successfully!');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error deleting the post:', error.response ? error.response.data : error.message);
        alert('Failed to delete post. Please try again.');
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
