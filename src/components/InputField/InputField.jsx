import React from 'react';
import { motion } from 'framer-motion';
import styles from './InputField.module.css';

const InputField = ({ label, type = 'text', name, value, onChange, error }) => (
  <motion.div 
    className={styles.field}
    whileFocus={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <label>{label}</label>
    <input 
      type={type} 
      name={name}                      // ✅ Add this line
      value={value} 
      onChange={onChange}
      className={error ? styles.error : ''}
    />
    {error && <span className={styles.errorMsg}>{error}</span>}
  </motion.div>
);

export default InputField;
