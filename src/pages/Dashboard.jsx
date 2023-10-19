import React, { useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/Dashboard.css';
import avatar from '../assets/images/avatar.png';
import service from '../api/service';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api` || 'http://localhost:5005/api';

function Dashboard() {
  const { user, fetchUserPosts } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(avatar);
  const [userPosts, setUserPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const token = localStorage.getItem('authToken');

  function capitalizeName() {
    if (user) {
      const firstChar = user.name[0].toUpperCase();
      const substring = user.name.substring(1);
      return firstChar + substring;
    } else {
      return 'Guest';
    }
  }

  const handleProfilePic = (e) => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    service
      .uploadProfilePic(uploadData, token)
      .then((response) => {
        console.log(response);
        if (response && response.fileUrl) {
          setProfilePic(response.fileUrl);
        } else {
          console.error('Error:', response);
        }
        localStorage.setItem('profilePic', response.fileUrl);

        return axios.post(`${API_URL}/update-user-profile-pic`, { userId: user._id, profilePicUrl: response.fileUrl }, { headers: { Authorization: `Bearer ${token}` } });
      })
      .then(() => {
        console.log('User profile picture updated successfully');
      })
      .catch((err) => {
        console.log(err.config);
        const errorDescription = err.response.data.message;
        setErrorMsg(errorDescription);
        console.log(err);
      });
  };

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic && user && token) {
      setProfilePic(storedProfilePic);
    } else {
      setProfilePic(avatar);
    }

    // FROM AUTH.CONTEXT
    fetchUserPosts().then((data) => {
      console.log('dashboard', data);
      if (data) {
        setUserPosts(data);
      }
    });
  }, [user, token, fetchUserPosts]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="dashboard-header">{capitalizeName()}'s Dashboard</h1>
      <img className="dashboard-profile-pic" src={profilePic} alt="login avatar" />
      <div>
        <label className="profile-pic-label" htmlFor="profilePicUrl">
          Upload pic
        </label>
        <input className="profile-pic-input" type="file" accept="image/*" data-max-file-size-mb="5" name="profilePicUrl" id="profilePicUrl" onChange={handleProfilePic} />
      </div>

      {errorMsg && (
        <div>
          <p></p>problem loading picture try again
        </div>
      )}

      <div className="dashboard-posts-container">
        <div className="blog-links-container">
          <div className="dashboard-post-header">
            <h2>Blog Posts:</h2>
          </div>

          {userPosts.map((post) => (
            <Link key={post._id} className="blog-link" to={`/user-posts/${post._id}`}>
              <h2>{post.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
