import React from 'react';
import '../component/Cards.css';
import { useState } from 'react';

function Cards() {
  const [isHover, setIsHover] = useState(false);
  const [initialIconColor, setInitialIconColor] = useState('#0d86d3');

  const hoverOnCard = () => {
    setIsHover(true);
  };

  const iconColor = () => {
    setIsHover(false);
    setInitialIconColor('#0d86d3');
  };

  return (
    <div className="card-grid-container">
      <div onMouseOver={hoverOnCard} onMouseOut={iconColor} className="card">
        {isHover ? (
          <i style={{ color: '#ffffff' }} className="fa-solid fa-2xl fa-user card-icon "></i>
        ) : (
          <i style={{ color: initialIconColor }} className="fa-solid fa-2xl fa-user card-icon "></i>
        )}

        <h1>Get started.</h1>
        <h2>Sign up to start sharing your travel experiences with others.</h2>
      </div>
      <div onMouseOver={hoverOnCard} onMouseOut={iconColor} className="card">
        {isHover ? (
          <i style={{ color: '#ffffff' }} className="fa-solid fa-2xl fa-globe card-icon "></i>
        ) : (
          <i style={{ color: initialIconColor }} className="fa-solid fa-2xl fa-globe card-icon "></i>
        )}

        <h1>Connect</h1>
        <h2>Your one stop destination to connect with travelers from around the world</h2>
      </div>

      <div onMouseOver={hoverOnCard} onMouseOut={iconColor} className="card">
        {isHover ? (
          <i i style={{ color: '#ffffff' }} className="fa-solid fa-2xl fa-share card-icon"></i>
        ) : (
          <i style={{ color: initialIconColor }} className="fa-solid fa-2xl fa-share card-icon"></i>
        )}

        <h1>Share</h1>
        <h2>Personal travel stories and local tips with a dynamic community!</h2>
      </div>
    </div>
  );
}

export default Cards;
