import React, { useState } from "react";
import PhoneNumberForm from "./components/PhoneNumberForm";
import OTPVerificationForm from "./components/OTPVerificationForm";

function App() {
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #caa9ff, #e8d2f9)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif"
      }}
    >
      {!otpSent ? (
        <PhoneNumberForm
          setOtpSent={setOtpSent}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      ) : (
        <OTPVerificationForm phoneNumber={phoneNumber} />
      )}
    </div>
  );
}

export default App;
