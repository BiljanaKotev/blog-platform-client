import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

function Search({ setFilteredPosts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    axios
      .get(`${API_URL}/blog-feed`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filteredPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchBar"></label>
        <input className="search-bar" type="text" placeholder="Search" name="searchBar" id="searchBar" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
export default Search;
