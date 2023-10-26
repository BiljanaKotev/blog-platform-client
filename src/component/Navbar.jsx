import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/images/travel-hub-logo-2.png';
import '../component/Navbar.css';
import LogoutPage from '../pages/LogoutPage';

function Navbar({ color, navLinkColor }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
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
            <Link style={{ color: navLinkColor }} className="nav-link login-link" to="/login">
              Login
            </Link>

            <Link style={{ color: navLinkColor }} className="nav-link signup-link" to="/signup">
              Signup
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <div className="dashboard-links-container">
            <Link to="/blog-feed" className="blogfeed-link create-post-link">
              Blog Feed
            </Link>
            <Link to="/create-post" className="create-post-link">
              + Create Post
            </Link>
            <Link to="/dashboard" className="dashboard-btn-link">
              Dashboard
            </Link>
          </div>
        )}
        {isLoggedIn && <LogoutPage />}
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
