import React from "react";
import styles from "./PhoneNumberForm.module.css";

function SuccessPage() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2 className={styles.title}>✅ Verification Successful!</h2>
        <p>You have logged in successfully.</p>
        <p className={styles.footer}>© 2025 Auth App</p>
      </div>
    </div>
  );
}

export default SuccessPage;
