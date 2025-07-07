const { createCanvas } = require('canvas');

function generateCaptcha() {
  const width = 120;
  const height = 40;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background color
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  // Generate random text
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let text = '';
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Draw text
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText(text, 10, 25);

  // Return PNG buffer and text
  return {
    captcha: canvas.toBuffer(),
    text,
  };
}

module.exports = { generateCaptcha };