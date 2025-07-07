# 🔐 Auth App with OTP Verification (Node.js + React)

A complete authentication system with OTP (One-Time Password) verification via email. This app allows users to register using their email, receive an OTP, and verify it to complete the authentication process.

---

## 📌 Features

- User registration using email
- OTP (One-Time Password) generation
- Email-based OTP delivery using Nodemailer
- Secure OTP verification
- Frontend in React
- Backend in Node.js and Express
- Basic styling and responsive layout

---

## 🏗️ Project Structure



---

## 🔧 Tech Stack

### Frontend:
- React.js
- Axios (for API requests)
- Tailwind CSS (optional for styling)

### Backend:
- Node.js
- Express.js
- Nodemailer
- dotenv
- cors
- uuid (for OTP session tracking)

---

## 🚀 How to Run the App Locally

### 1. Clone the repository

```bash
git clone https://github.com/goelarnav1/Authentication-App.git
cd Auth-App

## setup Backend
cd backend
npm install

## setup frontend
cd ../frontend
npm install
npm start


🧪 Testing the App
Enter your email on the homepage.

You’ll receive a 6-digit OTP on that email.

Enter the OTP and click Verify.

You’ll see a success message if OTP is correct and not expired.



🧪 Testing the App
Enter your email on the homepage.

You’ll receive a 6-digit OTP on that email.

Enter the OTP and click Verify.

You’ll see a success message if OTP is correct and not expired.





🔐 Security Considerations
OTP expires after a short duration (default is 5 minutes).

No user credentials are stored permanently in this version.

Future upgrades can include database support, token-based auth, etc.



🤝 Contributing
Beginner-friendly project! Feel free to fork, improve styling, or add features like:

Database integration (MongoDB)

Resend OTP

Expiry timer on frontend

Login with token after OTP




contact: goelarnav35@gmail.com



📜 License
This project is licensed under the MIT License