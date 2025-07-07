import React, { useState } from "react";
import styles from "./PhoneNumberForm.module.css"; // Reusing same CSS

function OTPVerificationForm({ phoneNumber }) {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("pending"); // "pending", "error", "success"
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("pending");

    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleVerify} className={styles.form}>
        <h2 className={styles.title}>Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit">Verify OTP</button>

        {status === "success" && (
          <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
            ✅ OTP Verified Successfully!
          </p>
        )}
        {error && (
          <p className={styles.error}>{error}</p>
        )}
      </form>
    </div>
  );
}

export default OTPVerificationForm;
