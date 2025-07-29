

const jwt = require("jsonwebtoken");
const { HTTP_STATUS, MESSAGES } = require('../constants/constants')
const { body, validationResult } = require("express-validator");
const response = require('../utils/response')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const crypto = require('crypto');


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

module.exports = {
    transporter,

    hashedPassword: async (password) => {
        let hashedPassword = bcrypt.hashSync(password, 10)
        return hashedPassword
    },

    comparePassword: async (plainPassword, hashedPassword) => {
        let comparePass = bcrypt.compareSync(plainPassword, hashedPassword);
        return comparePass
    },

    //jwttoken generate
    jwtTokenGenerate: async (payload = {}, expiresIn) => {
        const options = expiresIn ? { expiresIn } : {};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    },

    //express error function
    handelValidation: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.badRequest(res, MESSAGES.INPUT_VALIDATE_FAIL, HTTP_STATUS.BAD_REQUEST, errors.array())
        }
        next();
    },

    generateSecureOtp: () => {
        const buffer = crypto.randomBytes(3);
        const otp = parseInt(buffer.toString('hex'), 16) % 900000 + 100000;
        return otp.toString();
    },





};
