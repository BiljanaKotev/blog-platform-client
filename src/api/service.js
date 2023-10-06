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

const uploadProfilePic = (uploadData, token) => {
  return api
    .post('/upload', uploadData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};

const updateUserProfilePic = (profilePicUrl, token) => {
  return api
    .post('/update-user-profile-pic', { profilePicUrl }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api
    .post('/upload', file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const createPostWithImage = (postData, coverImgFile, token) => {
  const uploadData = new FormData();
  uploadData.append('imgUrl', coverImgFile);

  return api
    .post('/upload', uploadData, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      postData.coverImg = response.data.fileUrl;

      return api.post('/create-post', postData, { headers: { Authorization: `Bearer ${token}` } });
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

export const fetchBlogFeed = (token) => {
  return axios
    .get(`${API_URL}/blog-feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching blog feed:', error);
      return Promise.reject(error);
    });
};

const service = { updateUserProfilePic, uploadImage, createPostWithImage, uploadProfilePic, fetchBlogFeed };

export default service;
