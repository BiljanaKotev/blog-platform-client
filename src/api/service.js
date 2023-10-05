// src/api/service.js

import axios from 'axios';
const API_URL = 'http://localhost:5005/api';
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${API_URL}`,
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const uploadProfilePic = (file, token) => {
  const formData = new FormData();
  formData.append('imageUrl', file);

  return api
    .post('/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const getBlogFeed = () => {
  return api
    .get('/blog-feed')
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api
    .post('/upload', file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const createPost = (newPost) => {
  return api
    .post('/create-post', newPost)
    .then((res) => res.data)
    .catch(errorHandler);
};

const service = { getBlogFeed, uploadImage, createPost, uploadProfilePic };

export default service;
