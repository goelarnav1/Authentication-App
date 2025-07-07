const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true only for HTTPS
}));

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Backend listening on http://localhost:3000');
});
