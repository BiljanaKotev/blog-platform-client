import React from 'react';
import '../component/Cards.css';

function Cards() {
  return (
    <div className="card-grid-container">
      <div className="card">
        <i class="fa-solid fa-globe"></i>
        <h1>Create an account.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ratione!</h2>
      </div>
      <div className="card">
        <i class="fa-solid fa-globe"></i>
        <h1>Create an account.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ratione!</h2>
      </div>
      <div className="card">
        <i class="fa-solid fa-globe"></i>
        <h1>Create an account.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ratione!</h2>
      </div>
    </div>
  );
}

export default Cards;
