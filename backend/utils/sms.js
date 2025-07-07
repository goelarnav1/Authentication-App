const axios = require('axios');

// Replace this IP with your Android device's local IP
const GATEWAY_URL = 'http://192.168.1.100:8080/send-sms';

async function sendSms(phone, message) {
  try {
    await axios.post(GATEWAY_URL, {
      phoneNumber: phone,
      message,
    });
    console.log(`SMS sent to ${phone}`);
  } catch (err) {
    console.error('Failed to send SMS:', err.message);
  }
}

module.exports = { sendSms };