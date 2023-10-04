import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/BlogFeed.css';

const API_URL = 'http://localhost:5005';

function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog-feed`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="blog-feed-container">
      {posts.map((post) => (
        <div className="blog-feed-post-container" key={post._id}>
          <div>
            <img src={post.coverImg} alt="cover" />
          </div>
          <div>
            <img src={post.profilePicUrl} alt="Author" />
            <h2>{post.author}</h2>
          </div>
          <div>
            <Link to={`/blog-feed`}>
              <h1>{post.title}</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogFeed;
