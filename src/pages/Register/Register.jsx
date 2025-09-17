// pages/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InputField from '../../components/InputField/InputField';
import { register, getallRoles } from '../../services/api';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', roleId: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getallRoles();
        setRoles(data);
        console.log('Roles fetched:', data);
      } catch (err) {
        setError('Failed to load roles');
        console.error('Roles fetch error:', err);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    if (!formData.roleId) {
      setError('Please select a role');
      return;
    }
    setLoading(true);
    try {
      await register(formData);
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      setError('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register for MessMate</h2>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={error}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.field}>
          <label>Role</label>
          <motion.select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className={styles.select}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="">Select a Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.rolename}
              </option>
            ))}
          </motion.select>
        </div>
        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.submitBtn}
        >
          {loading ? 'Registering...' : 'Register'}
        </motion.button>
        {error && <p className={styles.message}>{error}</p>}
      </form>
    </motion.div>
  );
};

export default Register;