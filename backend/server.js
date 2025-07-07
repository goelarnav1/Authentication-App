const express = require("express");
const cors = require("cors");
const session = require("express-session");
const svgCaptcha = require("svg-captcha");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: "otpSecretKey",
    resave: false,
    saveUninitialized: true
  })
);

// In-memory OTP store
const otpStore = new Map();

// CAPTCHA Route
app.get("/api/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 3,
    color: true,
    background: "#f2f2f2"
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
});

// Send OTP Route
app.post("/api/send-otp", (req, res) => {
  const { email, phoneNumber, enteredCaptcha } = req.body;

  if (enteredCaptcha !== req.session.captcha) {
    return res.status(400).json({ message: "Invalid CAPTCHA" });
  }

  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(phoneNumber, generatedOTP);
  console.log(`Generated OTP for ${phoneNumber}: ${generatedOTP}`);

  return res.status(200).json({ message: "OTP sent" });
});

// Verify OTP Route
app.post("/api/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;
  const storedOtp = otpStore.get(phoneNumber);

  if (!storedOtp) {
    return res.status(400).json({ message: "No OTP found for this number." });
  }

  if (otp === storedOtp) {
    otpStore.delete(phoneNumber);
    return res.status(200).json({ message: "OTP verified" });
  } else {
    return res.status(400).json({ message: "Incorrect OTP" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
