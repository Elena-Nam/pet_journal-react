import LoginForm from "../components/LoginForm"
import styles from "./LoginPage.module.css";
function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;