import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <Link to="/user-post-edit">Edit</Link>
      <Link to="/user-post-delete">Delete</Link>
      <div className="">
        <img className="cover-img blog" src={userPost.coverImg} alt="Cover" />
        <h1>{userPost.title}</h1>
        <p>{userPost.content}</p>
        {userPost.author && userPost.author.name && <p>Created By: {userPost.author.name}</p>}

        <Link to="/dashboard">Back</Link>
      </div>
    </div>
  );
}

export default UserPost;
