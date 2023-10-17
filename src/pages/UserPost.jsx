import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditBtn from '../component/EditBtn';

const API_URL = 'http://localhost:5005';

function UserPost() {
  const [userPost, setUserPost] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUserPost(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [navigate, token, id]);

  if (!userPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="user-post-container">
        <img className="cover-img blog user-post-img" src={userPost.coverImg} alt="Cover" />
        <h1>{userPost.title}</h1>
        <p className="user-post-content">{userPost.content}</p>
        {userPost.author && userPost.author.name && <p>Created By: {userPost.author.name}</p>}

        <EditBtn />

        <Link to="/dashboard" className="user-post-back-link">
          <i class="fa-solid fa-arrow-left"></i>
          Back
        </Link>
      </div>
    </div>
  );
}

export default UserPost;

