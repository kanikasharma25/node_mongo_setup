const { body, validationResult } = require("express-validator");
const constants = require("../../constants/constants");
const { handelValidation } = require("../../utils/helper");

const validateAdminLogin = [

  body("email")
    .notEmpty()
    .withMessage(constants.MESSAGES.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(constants.MESSAGES.EMAIL_INVALID),

  body("password").notEmpty().withMessage(constants.MESSAGES.PASSWORD_REQUIRED),

  handelValidation

];

const validateAdminchangePassword = [

  body("oldPassword")
    .notEmpty()
    .withMessage(constants.MESSAGES.OLD_PASSWORD_REQUIRED),

  body("newPassword").notEmpty().withMessage(constants.MESSAGES.NEW_PASSWORD_REQUIRED),

  handelValidation

];

const forgetPasswordValidate = [

  body("email")
    .notEmpty()
    .withMessage(constants.MESSAGES.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(constants.MESSAGES.EMAIL_INVALID),

  handelValidation

];

const resetPasswordValidate = [

  body("resetToken")
    .notEmpty()
    .withMessage(constants.MESSAGES.RESET_TOKEN_REQUIRED),
  body("newPassword")
    .notEmpty()
    .withMessage(constants.MESSAGES.NEW_PASSWORD_REQUIRED),

  handelValidation

];

module.exports = {
  validateAdminLogin,
  validateAdminchangePassword,
  forgetPasswordValidate,
  resetPasswordValidate
};
