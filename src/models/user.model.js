const mongoose = require('mongoose');
const {ROLES} = require('../constants/constants.js');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: ''},
    password: { type: String, default: '' },
    role: { type: String, enum: [ROLES.ADMIN, ROLES.USER], default: ROLES.USER },
    otp: { type: String, default: '' },
    isOtpVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    deviceToken: { type: String, default: '' }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
