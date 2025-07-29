# RPRT ( nodejs + mongodb )
The RP-RT Prospecting Application will support outbound sales reps by helping them plan and execute daily prospecting routes.

## Tech Stack
- Node.js
- Express.js
- MongoDB

## Installation
git clone repoPath
cd project
npm install

## Create .env file
need all the required keys for project

## 📦 Packages Used

| Package           | Version   | Purpose |
|-------------------|-----------|---------|
| node              | ˆ18.20.8  | Runtime environment for executing JavaScript code on the server side.|
| express           | ^5.1.0    | Web framework to handle routes and middleware |
| mongoose          | ^^8.16.4  | ODM to interact with MongoDB easily |
| bcrypt            | ^6.0.0    | to encrypt password before saving them to db |
| dotenv            | ^17.2.0   | Load environment variables from `.env` file |
| jsonwebtoken      | ^9.0.2    | To create/verify JWT tokens for secure auth |
| nodemon           | ^3.1.0    | Auto-restarts the server during development |
| cors              | ^2.8.5    | Allow frontend apps (like React) to connect without CORS issues |
| express-validator | ^7.2.1    | Middleware to validate and sanitize incoming request data (e.g. email, password). |
| nodemailer        | ^7.0.5    | Used to send emails |                                                               




const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Admin = require("../models/adminModel"); // adjust path

async function forgotPassword(req, res) {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ msg: "Email not registered" });
  }

  // Generate secure token and expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expireTime = Date.now() + 1000 * 60 * 15; // 15 min expiry

  // Save to DB
  admin.resetToken = token;
  admin.resetTokenExpires = expireTime;
  await admin.save();

  // Setup transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetLink = `https://yourfrontenddomain.com/admin/reset-password?token=${token}`;

  // Compose email
  const mailOptions = {
    from: `"Admin Support" <${process.env.SMTP_USER}>`,
    to: admin.email,
    subject: "Password Reset Link",
    html: `
      <h3>Password Reset Requested</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);

  return res.json({ msg: "Password reset link sent to email" });
}