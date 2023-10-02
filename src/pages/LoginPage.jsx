import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    console.log(requestBody);

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);
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
      <form onSubmit={handleSubmit}>
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
