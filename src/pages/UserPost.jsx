import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditBtn from '../component/EditBtn';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5005/api';

function UserPost() {
  const [userPost, setUserPost] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  function capitalizeName(name) {
    if (user) {
      const firstChar = user.name[0].toUpperCase();
      const substring = user.name.substring(1);
      return firstChar + substring;
    } else {
      return 'user not found';
    }
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
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
        <div className="success-msg-container">{/* <p>Post deleted successfully</p> */}</div>

        {!userPost ? <div>Loading...</div> : <img className="cover-img blog user-post-img" src={userPost.coverImg} alt="Cover" />}

        <h1>{userPost.title}</h1>
        <p className="user-post-content">{userPost.content}</p>
        {userPost.author && userPost.author.name && <p>Created By: {capitalizeName(author.name)}</p>}

        <EditBtn />

        <Link to="/dashboard" className="user-post-back-link">
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </Link>
      </div>
    </div>
  );
}

export default UserPost;
