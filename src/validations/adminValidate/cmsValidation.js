const { body } = require("express-validator");
const constants = require("../../constants/constants");
const { handelValidation } = require("../../utils/helper");

const cmsValidation = [

    body("content")
        .notEmpty()
        .withMessage(constants.MESSAGES.CMS_CONTENT_REQ),

    body("id")
        .notEmpty()
        .withMessage(constants.MESSAGES.ID_REQ),

    handelValidation

];

module.exports = {
    cmsValidation,
};
