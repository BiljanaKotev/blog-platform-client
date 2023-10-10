import React from 'react';
import '../component/Comments.css';
import { useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
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
        <textarea className="comments-textarea" value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
        <button type="submit">Add Comment</button>
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
