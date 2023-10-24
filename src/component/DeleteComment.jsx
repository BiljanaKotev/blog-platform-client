import React from 'react';
import axios from 'axios';
import './DeleteBtn.css';
import { API_URL } from '../api/service';

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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteComment;
