import React from 'react';
import '../pages/HomePage.css';
import { useNavigate } from 'react-router-dom';
import homepageImg from '../assets/images/bg-pic.jpg';
import Cards from '../component/Cards';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <main className="homepage-bg full-screen ">
      <div className="homepage-container">
        <div>
          <img className="homepage-img img-fluid" src={homepageImg} alt="" />
        </div>
        <div className="overlay"></div>
      </div>
      <div className="homepage-header">
        <h1 className=" text-white  ">Share your travels with the world. </h1>
        <h2 className="text-white ">
          Travel Hub is a central platform that connects travelers from around the world. It offers a unique blend of personal travel stories, actionable localized tips, and a
          dynamic community eager to share and engage.
        </h2>
      </div>

      <button className="homepage-btn" onClick={handleClick}>
        Get Started
      </button>
      <section className="homepage-blog-info">
        <div className="blog-info-header">
          <h3>Lorem ipsum dolor sit.</h3>
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro.</h4>
        </div>
        <Cards />
      </section>
    </main>
  );
}

export default HomePage;
