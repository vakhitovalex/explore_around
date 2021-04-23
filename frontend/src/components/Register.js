import React, { useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
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
    props.handleRegister(password, email);
  }

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     history.push('/');
  //   }
  // }, []);

  return (
    <div className="login">
      <h2 className="login__header">Sign up</h2>
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
            Sign up
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>
          Already a member?
          <Link to="/signin" className="login__link">
            {' '}
            Log in here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Register);
