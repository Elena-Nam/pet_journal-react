import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import {FaHome, FaTasks} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { PiDog } from "react-icons/pi";



function Navbar() {
  const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

  return (
    <nav>
      <div className="navbar">
        <div className={styles.links}>
        <Link to="/" className={styles.active}>
          <FaHome size={30}  color= "#000" />
        </Link>
        <Link to="/pets" className={styles.link}>
          <FaTasks size={30}  color= "#000"/>
        </Link>
        
        <Link to="/pets/:id" className={styles.link}>
          <PiDog size={30} color= "#000"/>
        </Link>
        <button onClick={handleLogout}>
          <FiLogOut /> Sign out
        </button>
      </div>  
    </div>
    </nav>
    
  );
}

export default Navbar;

