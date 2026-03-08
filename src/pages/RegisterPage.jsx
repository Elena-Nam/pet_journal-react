import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import styles from "./LoginPage.module.css"; 


function RegisterPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <RegisterForm />
      </div>
      <Link to="/">
        <button className={styles.primaryBtn}> Back </button>
      </Link>
    </div>
  );
}

export default RegisterPage;