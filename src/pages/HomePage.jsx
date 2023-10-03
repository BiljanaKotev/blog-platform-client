import React from 'react';
import '../pages/HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <main className="homepage-bg full-screen">
      <div className="overlay"></div>

      <h1 className=" text-white position-absolute homepage-header">Share your travels with the world</h1>

      <button className="homepage-btn" onClick={handleClick}>
        Get Started
      </button>
    </main>
  );
}

export default HomePage;
