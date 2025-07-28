require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');

const connectDB = require('./config/db');
const indexRouter = require('./routes/index');
const { serverError } = require('./utils/response');
const { MESSAGES } = require('./constants/constants');

const app = express();

// Connect MongoDB
connectDB();

// Run Admin Seeder (creates default admin)
require('./config/adminSeed');

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // to serve profile/post images
app.use(express.static(path.join(__dirname, 'public')));

// EJS view engine setup (if needed)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);

// 404 Error Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  console.error('err:', err);
  serverError( res, MESSAGES.SERVER_ERROR, err.message)
});

module.exports = app;
