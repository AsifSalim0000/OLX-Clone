import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebase';
import Logo from '../../olx-logo.png';
import spinner from '../../circle-9360_256.gif'
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || trimmedPassword === '') {
      toast('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(trimmedEmail, trimmedPassword);
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      toast('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    ) : (
      <div>
        <ToastContainer />
        <div className="loginParentDiv">
          <img width="150px" height="150px" src={Logo} alt="Logo" />
          <form onSubmit={user_auth}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
            />
            <br />
            <br />
            <button className='rounded'>Login</button>
          </form>
          <a onClick={() => navigate('/signup')}>Signup</a>
        </div>
      </div>
    )
  );
}
