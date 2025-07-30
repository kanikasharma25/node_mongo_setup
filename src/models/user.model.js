
const mongoose = require('mongoose');
const { ROLES, GENDER, OTP_TYPE } = require('../constants/constants.js');

const userSchema = new mongoose.Schema(
  {
    
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, enum: [ROLES.ADMIN, ROLES.SALES_REP], default: ROLES.SALES_REP },
    otpType: { type: String, enum: [OTP_TYPE.LOGIN, OTP_TYPE.RESET_PASS], default: OTP_TYPE.LOGIN  }, // for app developer use only
    otp: { type: String, default: '' },
    isOtpVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    deviceToken: { type: String, default: '' },
    tokenChecker: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    countryCode: { type: String, default: ''},
    phone: {type: String, default: ''},
    gender: {type: String, enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER], default: GENDER.MALE},

    // for forgetPassword logic
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
