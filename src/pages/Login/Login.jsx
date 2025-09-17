// pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InputField from '../../components/InputField/InputField';
import { login } from '../../services/api'
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      navigate('/home'); // Redirect on success
    } catch (err) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 50 }} // Fade in from bottom
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login to MessMate</h2>
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={error}
        />
        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.05 }} // Scale on hover
          whileTap={{ scale: 0.95 }} // Scale down on click
          className={styles.submitBtn}
        >
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Login;