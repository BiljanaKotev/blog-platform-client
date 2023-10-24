import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/BlogPost.css';
import '../component/Comments';
import Comments from '../component/Comments';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api` || 'http://localhost:5005/api';

function BlogPost() {
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  const { user } = useContext(AuthContext);


  function capitalizeName() {
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
      .get(`${API_URL}/blog-feed/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post-container">
      <img className="cover-img blog-post-img" src={post.coverImg} alt="Cover" />
      <h1 className="blog-post-header">{post.title}</h1>
      <p className="blog-post-content">{post.content}</p>
      <p>Created By: {capitalizeName()}</p>
      <Comments />
      <Link to="/blog-feed" className="blog-post-link">
        <i className="fa-solid fa-arrow-left"></i>
        Back
      </Link>
    </div>
  );
}

export default BlogPost;
