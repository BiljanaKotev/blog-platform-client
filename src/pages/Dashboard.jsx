import React, { useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/Dashboard.css';
import avatar from '../assets/images/avatar.png';
import service from '../api/service';

const API_URL = 'http://localhost:5005';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');
  const [profilePic, setProfilePic] = useState(avatar);

  const handleProfilePic = (e) => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    service
      .uploadProfilePic(uploadData, token)
      .then((response) => {
        setProfilePic(response.fileUrl);
        localStorage.setItem('profilePic', response.fileUrl);
      })
      .catch((err) => {
        console.log('err while uploading the file', err);
      });
  };

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic && user && token) {
      setProfilePic(storedProfilePic);
    } else {
      setProfilePic(avatar);
    }
    axios
      .get(`${API_URL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>{user.name}'s Dashboard</h1>
      <img className="dashboard-profile-pic" src={profilePic} alt="login avatar" />
      <div>
        <label className="profile-pic-label" htmlFor="profilePicUrl">
          Upload pic
        </label>
        <input className="profile-pic-input" type="file" accept="image/*" data-max-file-size-mb="25" name="profilePicUrl" id="profilePicUrl" onChange={handleProfilePic} />
      </div>
      <div className="blog-posts-container">
        <div className="blog-post-header">
          <h2>Blog Posts:</h2>
        </div>
        <div className="blog-links-container">
          <Link className="blog-link" to="/dashboard/blog-post">
            Adventures in Greece
          </Link>
          <Link className="blog-link" to="/dashboard/blog-post">
            Adventures in Greece
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
