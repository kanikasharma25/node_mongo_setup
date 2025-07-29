
const mongoose = require('mongoose');
const { ROLES } = require('../constants/constants.js');

const userSchema = new mongoose.Schema(
  {
    
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, enum: [ROLES.ADMIN, ROLES.SALES_REP], default: ROLES.SALES_REP },
    otp: { type: String, default: '' },
    isOtpVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    deviceToken: { type: String, default: '' },
    tokenChecker: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    countryCode: { type: String, default: ''},
    phone: {type: String, default: ''},

    // for forgetPassword logic
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
