const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const sessions = require('../sessions'); // your session utils
const smsUtils = require('../utils/sms');

// Generate new CAPTCHA
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 2,
    color: true,
    background: '#ccf2ff',
    size: 6,
  });

  req.session.captcha = captcha.text.toUpperCase(); // store for validation
  res.type('svg');
  res.send(captcha.data);
});

// Send OTP with CAPTCHA verification
router.post('/send-otp', (req, res) => {
  const { phone, captchaInput } = req.body;

  if (!phone || !captchaInput) {
    return res.status(400).json({ error: 'Phone and CAPTCHA required' });
  }

  if (req.session.captcha !== captchaInput.toUpperCase()) {
    return res.status(400).json({ error: 'Invalid CAPTCHA' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  sessions.setOtp(phone, otp);
  smsUtils.sendSms(phone, `Your OTP is: ${otp}`);

  res.json({ success: true });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP required' });
  }

  const storedOtp = sessions.getOtp(phone);
  if (!storedOtp) {
    return res.status(400).json({ error: 'OTP expired or not found' });
  }

  if (storedOtp.otp === otp && Date.now() < storedOtp.expiresAt) {
    req.session.user = { phone };
    return res.json({ success: true });
  }

  return res.status(400).json({ error: 'Invalid or expired OTP' });
});

module.exports = router;
