import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css";
import {FaHome, FaDog, FaTasks} from "react-icons/fa";
  import { PiDog } from "react-icons/pi";
function Navbar() {
  return (
<nav>
           <div className="nav-icons">
             <Link to="/" className="active">
               <FaHome size={20} />
             </Link>
             <Link to="/lists">
               <FaTasks size={20} />
             </Link>
             <Link to="/lists">
               <PiDog />
             </Link>
           </div>
           
       </nav>


    // <nav className={styles.navbar}>
    //   <Link to="/" className={styles.logo}>
    //     Pet Journal
    //   </Link>

    //   <div className={styles.links}>
    //     <Link to="/login" className={`${styles.link} ${styles.linkLogin}`}>
    //       Log in
    //     </Link>
    //     <Link to="/register" className={`${styles.link} ${styles.linkRegister}`}>
    //       Register
    //     </Link>
    //   </div>

    //   <div className={styles.navMenu}>
    //     <ul className={styles.navList}>
    //       <li className={styles.navItem}>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li className={styles.navItem}>
    //         <Link to="/pets">Pets</Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Navbar;

// <nav>
//           <div className="nav-icons">
//             <Link to="/" className="active">
//               <FaHome size={20} />
//             </Link>
//             <Link to="/lists">
//               <FaTasks size={20} />
//             </Link>
//           </div>
//           
//         </nav>