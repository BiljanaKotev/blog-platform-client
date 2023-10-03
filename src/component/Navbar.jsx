import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/images/Blue and Black Minimalist Travel Agency Logo.png';
import '../component/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate('/');
  };
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>

      {!isLoggedIn && (
        <div className="nav-links-container">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
