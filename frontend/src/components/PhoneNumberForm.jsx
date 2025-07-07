// src/components/PhoneNumberForm.jsx
import React, { useState, useEffect } from "react";
import styles from "./PhoneNumberForm.module.css";

function PhoneNumberForm({ setOtpSent, phoneNumber, setPhoneNumber }) {
  const [email, setEmail] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("/api/captcha");
  const [error, setError] = useState("");

  const refreshCaptcha = () => {
    const timestamp = new Date().getTime();
    setCaptchaUrl(`/api/captcha?t=${timestamp}`);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phoneNumber, captcha: captchaInput })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setOtpSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
      refreshCaptcha();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="+91"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label>CAPTCHA</label>
        <div className={styles.captchaContainer}>
          <img
            src={captchaUrl}
            alt="CAPTCHA"
            className={styles.captchaImage}
            onClick={refreshCaptcha}
          />
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.footer}>© 2025 Auth App</p>
      </form>
    </div>
  );
}

export default PhoneNumberForm;
