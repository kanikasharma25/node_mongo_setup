const { body } = require("express-validator");
const constants = require("../../constants/constants");
const { handelValidation } = require("../../utils/helper");

const validateLogin = [

  body("email")
    .notEmpty()
    .withMessage(constants.MESSAGES.EMAIL_REQUIRED)
    .trim()
    .isEmail()
    .withMessage(constants.MESSAGES.EMAIL_INVALID),

  body("password").notEmpty().withMessage(constants.MESSAGES.PASSWORD_REQUIRED),

  body("deviceToken").notEmpty().withMessage(constants.MESSAGES.DEVICETOKEN_REQ),

  handelValidation

];

module.exports = {
    validateLogin,
};
