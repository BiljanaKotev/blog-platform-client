import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/BlogFeed.css';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('authToken');
  const { user } = useContext(AuthContext);
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
            <h2>{user.name}</h2>
          </div>
          <div>
            <Link to={`/blog-feed/${post._id}`}>
              <h1>{post.title}</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogFeed;
