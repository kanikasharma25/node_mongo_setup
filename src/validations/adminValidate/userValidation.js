const { body } = require("express-validator");
const constants = require("../../constants/constants");
const { handelValidation } = require("../../utils/helper");

const createUserValidate = [

    body("firstName")
        .notEmpty()
        .withMessage(constants.MESSAGES.FIRSTNAME_REQ),

    body("lastName")
        .notEmpty()
        .withMessage(constants.MESSAGES.LASTNAME_REQ),

    body("countryCode")
        .notEmpty()
        .withMessage(constants.MESSAGES.COUNTRYCODE_REQ),

    body("phone")
        .notEmpty()
        .withMessage(constants.MESSAGES.PHONE_REQ),

    body("email")
        .notEmpty()
        .withMessage(constants.MESSAGES.EMAIL_REQUIRED)
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage(constants.MESSAGES.EMAIL_INVALID),


    handelValidation

];

module.exports = {
    createUserValidate,
};
