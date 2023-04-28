import React, { useState } from 'react';
import { login } from '../api';
import { useHistory } from 'react-router-dom';

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(username, password, token);
    if (response && response.data && response.data.token) {
      setToken(response.data.token);
      history.push('/')
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength={3}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
