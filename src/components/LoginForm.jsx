import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css"; // reuse the same styles
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Login form submitted:", formData);
    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      // localUrl= 'http://localhost:3000/api/v1/auth/login'
      const API_URL = "https://pet-journal-r991.onrender.com/api/v1/auth/login"
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage(` Welcome, ${data.user.name}!`); 
        setMessageType('success');
        setFormData({ email: '', password: ''});
        navigate("/pets");
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
      <h1 className={styles.title}>Login</h1>
       {message && (
        <p style={{ color: 'black', textAlign: 'center' , fontWeight: 'bold', fontSize: '1.5rem'}}>
          {message} 
        </p> 
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
          style={{ margin: "1.5rem" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
          required
          style={{ marginBottom: "1rem" }}
        />

        <button type="submit" className={styles.primaryBtn} disabled={loading}>Login</button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/register" >Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;