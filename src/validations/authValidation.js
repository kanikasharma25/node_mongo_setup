const { body, validationResult } = require("express-validator");
const constants = require("../constants/contants");
const { handelValidation } = require("../utils/helper");

const validateLogin = [

  body("email")
    .notEmpty()
    .withMessage(constants.MESSAGES.INPUT_EMAIL_REQ)
    .isEmail()
    .withMessage(constants.MESSAGES.INPUT_EMAIL_INVALID),

  body("password").notEmpty().withMessage(constants.MESSAGES.INPUT_PASS_REQ),

  handelValidation

];

module.exports = {
  validateLogin,
};
