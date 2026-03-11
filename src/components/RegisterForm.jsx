import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css"; 
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }
    setLoading(true);

    try {
      // localUrl = 'http://localhost:3000/api/v1/auth/register';
      
    const API_URL = "https://pet-journal-r991.onrender.com/api/v1/auth/register";
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Registration is successful! Welcome, ${data.user.name}!`); 
        setMessageType('success');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate("/login");
      } else {
        setMessage(data.msg );
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error.Please try again later');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.tagline}>Join Pet Journal and start tracking your pets today!</p>
      {message && (
        <p style={{ color: 'black', textAlign: 'center' , fontWeight: 'bold', fontSize: '1.5rem'}}>
          {message} 
        </p> 
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.inputField}
          required
          style={{ marginBottom: "1rem" }}
        />

        <button type="submit" className={styles.primaryBtn} disabled={loading}>Register</button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login" >Login</Link>
      </p>
    </div>
  );
}

export default RegisterForm;