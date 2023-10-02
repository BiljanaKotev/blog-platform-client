import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/images/Blue and Black Minimalist Travel Agency Logo.png';
import '../component/Navbar.css';

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>

      {!isLoggedIn && (
        <div className="nav-links-container">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
