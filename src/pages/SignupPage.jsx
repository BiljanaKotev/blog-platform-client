import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(undefined);
  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMsg(errorDescription);
      });
  };

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <main>
      <form onSubmit={handleSignupSubmit}>
        <h1>Signup</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={handleName} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} onChange={handleEmail} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={handlePassword} autoComplete="currrent-password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      <p>Already have an account?</p>
      <Link to="{'/login}">Login</Link>
    </main>
  );
}

export default SignupPage;