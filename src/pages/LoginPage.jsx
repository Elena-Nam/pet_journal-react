import LoginForm from "../components/LoginForm"
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <LoginForm />
      </div>
      <Link to="/">
        <button className={styles.primaryBtn}> Back </button>
      </Link>

      <Footer/>
    </div>
  );
}

export default LoginPage;