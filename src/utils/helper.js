

const jwt = require("jsonwebtoken");
const { HTTP_STATUS, MESSAGES } = require('../constants/constants')
const { body, validationResult } = require("express-validator");
const response = require('../utils/response')
module.exports = {

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

};
