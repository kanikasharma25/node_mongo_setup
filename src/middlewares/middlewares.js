const { MESSAGES, HTTP_STATUS } = require("../constants/constants");
const { badRequest } = require("../utils/response");
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const apiKeyValidator = (req, res, next) => {
    const originalUrl = req.originalUrl;
    const headers = req.headers;
    // Check for admin route
    if (originalUrl.startsWith('/admin')) {
        const adminApiKey = headers['adminapikey'];
        if (!adminApiKey || adminApiKey !== process.env.ADMIN_API_KEY) {
            return badRequest(res, MESSAGES.ADMIN_API_KEY_MISSING, HTTP_STATUS.UNAUTHORIZED)
        }
    }

    // Check for app route
    if (originalUrl.startsWith('/app')) {
        const appKey = headers['appapikey'];
        if (!appKey || appKey !== process.env.APP_API_KEY) {
            return badRequest(res, MESSAGES.APP_API_KEY_MISSING, HTTP_STATUS.UNAUTHORIZED)
        }
    }
    next();
};

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return badRequest(res, MESSAGES.AUTH_TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id)
    if (!user ) {
        return badRequest(res, MESSAGES.AUTH_TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED)
    }

    if(user.tokenChecker != decoded.tokenChecker){
        return badRequest(res, MESSAGES.AUTH_TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED)
    }

    req.user = user;
    next();

}

module.exports = { apiKeyValidator, verifyToken };

