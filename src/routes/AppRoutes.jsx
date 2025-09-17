// routes/AppRoute.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';

import Home from '../pages/Home/home';
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRoute = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default AppRoute;