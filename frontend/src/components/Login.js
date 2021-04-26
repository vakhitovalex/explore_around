import React, { useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      return;
    }
    props.handleLogin(password, email);
    if (localStorage.getItem('token')) {
      history.push('/');
    }
  }

  return (
    <div className="login">
      <h2 className="login__header">Log in</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          type="text"
          name="email"
          className="login__email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        ></input>
        <input
          required
          type="password"
          name="password"
          className="login__password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        ></input>
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Log in
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>
          Not a member yet?
          <Link to="/signup" className="login__link">
            {' '}
            Sign up here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Login);
