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

    body("gender")
        .notEmpty()
        .withMessage(constants.MESSAGES.GENDER_REQ)
        .isIn(Object.values(constants.GENDER))
        .withMessage(`${constants.MESSAGES.GENDER_ALLOWED} ${Object.values(constants.GENDER).join(', ')}`),


    handelValidation

];

const validateUserStatusUpdate = [

    body("userId")
        .notEmpty()
        .withMessage(constants.MESSAGES.USER_ID_REQ),

    body("status")
        .notEmpty()
        .withMessage(constants.MESSAGES.STATUS_REQ)
        .isIn([true, false])
        .withMessage('Status value can only be; true or false'),


    handelValidation

];

module.exports = {
    createUserValidate,
    validateUserStatusUpdate
};
