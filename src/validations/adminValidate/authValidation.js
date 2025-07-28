const { body, validationResult } = require("express-validator");
const constants = require("../../constants/constants");
const { handelValidation } = require("../../utils/helper");

const validateAdminLogin = [

  body("email")
    .notEmpty()
    .withMessage(constants.MESSAGES.INPUT_EMAIL_REQ)
    .isEmail()
    .withMessage(constants.MESSAGES.INPUT_EMAIL_INVALID),

  body("password").notEmpty().withMessage(constants.MESSAGES.INPUT_PASS_REQ),

  handelValidation

];

const validateAdminchangePassword = [

  body("oldPassword")
    .notEmpty()
    .withMessage(constants.MESSAGES.OLD_PASSWORD_REQUIRED),

  body("newPassword").notEmpty().withMessage(constants.MESSAGES.NEW_PASSWORD_REQUIRED),

  handelValidation

];

module.exports = {
  validateAdminLogin,
  validateAdminchangePassword
};
