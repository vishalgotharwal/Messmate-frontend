
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css'; 

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is authenticated

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>MessMate</h1>
          <span>GIT Jaipur</span>
        </Link>
        <nav className={styles.nav}>
          {isLoggedIn ? (
            <>
              <Link to="/home">Home</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;