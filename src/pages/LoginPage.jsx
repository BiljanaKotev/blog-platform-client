import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import '../pages/LoginPage.css';

const API_URL = 'http://localhost:5005';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        console.log('Login response:', response.data);

        storeToken(response.data.authToken);
        if (response.data.profilePicUrl) {
          localStorage.setItem('profilePic', response.data.profilePicUrl);
        }
        authenticateUser();
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMsg(errorDescription);
      });
  };

  return (
    <main>
      <form className="auth-form" onSubmit={handleLoginSubmit}>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">email</label>
          <input type="text" name="email" id="email" value={email} onChange={handleEmail} />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={password} onChange={handlePassword} autoComplete="currrent-password" />
        </div>
        <button type="submit">Submit</button>
      </form>

      {errorMsg && <p>{errorMsg}</p>}
      <p>Don't have an account yet?</p>
      <Link to={'/signup'}>Signup</Link>
    </main>
  );
}

export default LoginPage;
