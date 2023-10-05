import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5005';

function UserPost() {
  const [userPost, setUserPost] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user-posts`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUserPost(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [navigate, token]);

  if (!userPost.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userPost.map((post) => (
        <div key={post._id}>
          <Link to={`/post-detail/${post._id}`}>
            <h1>{post.title}</h1>
          </Link>
          <p>{post.content}</p>
          <p>{post.author}</p>
        </div>
      ))}
      <Link to="/dashboard">Back</Link>
    </div>
  );
}

export default UserPost;
