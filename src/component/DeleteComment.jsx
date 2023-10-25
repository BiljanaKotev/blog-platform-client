import React from 'react';
import axios from 'axios';

import './DeleteBtn.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5005/api';

function DeleteComment({ commentId, postId, onCommentDeleted }) {
  const token = localStorage.getItem('authToken');

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/blog-feed/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('successfully deleted');
        if (onCommentDeleted) {
          onCommentDeleted(commentId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button style={{ color: '#c91c1c', border: 'none', background: 'inherit' }} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteComment;
