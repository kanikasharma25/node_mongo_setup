
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require("cors");
const connectDB = require('./config/db');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


connectDB()
require('../src/config/adminSeed')

// routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error'); // if using EJS
});


// const crypto = require('crypto');

// // Function to generate 64-character API key (32 bytes)
// const generateApiKey = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// // Generate admin and app keys
// const adminApiKey = generateApiKey();
// const appApiKey = generateApiKey();
// const jwtSecretKey = generateApiKey();

// // Output
// console.log('✅ Generated Keys:');
// console.log('ADMIN_API_KEY =', adminApiKey);
// console.log('APP_API_KEY   =', appApiKey);
// console.log('JWT_SECRET_KEY   =', jwtSecretKey);

module.exports = app;
