import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FaCamera, FaNotesMedical, FaPaw, FaHeartbeat } from "react-icons/fa";
import Footer from "../components/Footer"

function Home() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>
        <FaPaw style={{ marginRight: "10px" }} />
        Pet Journal
        <FaPaw style={{ marginLeft: "10px" }} />
      </h1>

      <p className={styles.tagline}>
        Track your pet's life and cherish every moment.
      </p>

      <div className={styles.buttonGroup}>
        <Link to="/register">
          <button className={styles.primaryBtn}>Get Started</button>
        </Link>

        <Link to="/login">
          <button className={styles.secondaryBtn}>Login</button>
        </Link>
      </div>

      <div className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureCard}>
            <FaCamera size={40} color="#0D47A1" />
          </div>
          <h3>Save Memories</h3>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureCard}>
            <FaNotesMedical size={40} color="#0D47A1" />
          </div>
          <h3>Daily Notes</h3>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureCard}>
            <FaHeartbeat size={40} color="#FF6347" />
          </div>
          <h3>Track Health</h3>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureCard}>
            <FaPaw size={40} color="#0D47A1" />
          </div>
          <h3>Manage Multiple Pets</h3>
        </div>

      </div>
        <Footer/>
    </div>
  );
}

export default Home;