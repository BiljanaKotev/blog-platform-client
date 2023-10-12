import React from 'react';
import '../component/Comments.css';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../component/Comments.css';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('authToken');
  const API_URL = 'http://localhost:5005/api';
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/blog-feed/${id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/blog-feed/${id}/comments`, { text: newComment }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="comments-textarea-container">
          <textarea className="comments-textarea" value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
          <button className="comments-btn" type="submit">
            Add Comment
          </button>
        </div>
      </form>

      {comments.map((comment) => (
        <div key={comment._id} className="comments-container">
          <div className="user-img-container">
            <img className="blogfeed-profile-pic" src={comment.author.profilePicUrl} alt="User" />
          </div>
          <p className="comment-author">
            <strong>{comment.author.name}</strong>: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
