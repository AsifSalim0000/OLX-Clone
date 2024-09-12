import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/create" element={user ? <Create/>: <Navigate to="/login" />} />
        <Route path="/viewproduct/:productId" element={user ? <ViewPost/>: <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
