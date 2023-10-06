import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/images/travel-hub-logo-black-bg.png';
import '../component/Navbar.css';

function Navbar({ color, navLinkColor }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate('/');
  };
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav style={{ background: color }} className="nav blog-nav">
      <div className="logo-wrapper">
        <div className="logo-container">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          ) : (
            <Link to="/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          )}
        </div>
      </div>

      {!isLoggedIn && (
        <div className="nav-links-container">
          <Link style={{ color: navLinkColor }} className="nav-link" to="/login">
            Login
          </Link>
          <Link style={{ color: navLinkColor }} className="nav-link" to="/signup">
            Signup
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="dashboard-links-container">
          <Link to="/blog-feed" className="create-post-link">
            Blog Feed
          </Link>
          <Link to="/create-post" className="create-post-link">
            + Create Post
          </Link>
          <Link to="/dashboard" className="dashboard-link">
            Dashboard
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
