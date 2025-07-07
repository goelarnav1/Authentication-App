// In-memory store for OTPs
const otpStore = {};

function setOtp(phone, otp) {
  otpStore[phone] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  };
}

function getOtp(phone) {
  return otpStore[phone];
}

module.exports = { setOtp, getOtp };