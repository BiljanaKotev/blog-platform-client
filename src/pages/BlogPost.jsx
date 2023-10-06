import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/BlogPost.css';

const API_URL = 'http://localhost:5005';

function BlogPost() {
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog-feed/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post-container">
      <img className="cover-img blog-post-img" src={post.coverImg} alt="Cover" />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Created By: {post.author.name}</p>
      <Link to="/blog-feed">Back</Link>
    </div>
  );
}

export default BlogPost;
