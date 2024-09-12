import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../firebase';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from '../../circle-9360_256.gif'

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    const trimmedName = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName === '') {
      toast('Please enter your name.');
      return;
    }
    if (trimmedPhone === '') {
      toast('Please enter your phone number.');
      return;
    }
    if (trimmedEmail === '' || trimmedPassword === '') {
      toast('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signup(trimmedName, trimmedEmail, trimmedPassword, trimmedPhone);
      navigate('/login');
    } catch (error) {
      console.error('Authentication error:', error);
      toast('Signup failed. Please try again.');
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
        <div className="signupParentDiv">
          <img width="150px" height="150px" src={Logo} alt="Logo" />
          <form onSubmit={user_auth}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="fname"
              name="name"
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="fname"
              name="email"
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="lname"
              name="phone"
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="lname"
              name="password"
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <a onClick={() => navigate('/login')}>Login</a>
        </div>
      </div>
    )
  );
}
