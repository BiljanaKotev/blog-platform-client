import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/BlogFeed.css';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import service from '../api/service';

const API_URL = 'http://localhost:5005';

function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('authToken');
  const [search, setSearch] = useState('');
  const { user } = useContext(AuthContext);
  useEffect(() => {
    service
      .fetchBlogFeed(token)
      .then((response) => {
        console.log('Fetched Posts:', response);
        setPosts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <label htmlFor="searchBar"></label>
      <input className="search-bar" type="text" placeholder="Search" name="searchBar" id="searchBar" />
      <div className="blog-feed-container">
        {posts.map((post) => (
          <div className="blog-feed-post-container" key={post._id}>
            <div>
              <img className="cover-img" src={post.coverImg} alt="cover" />
            </div>
            <div className="user-details-container">
              {post.author && <img className="blogfeed-profile-pic" src={post.author.profilePicUrl} alt="Author" />}
              <h2 className="user-name">{user && user.name ? user.name : 'Loading...'}</h2>
            </div>
            <div className="link-container">
              <Link to={`/blog-feed/${post._id}`} className="title-link">
                <h1>{post.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogFeed;
