const { MESSAGES, HTTP_STATUS } = require("../constants/constants");
const { badRequest } = require("../utils/response");

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
        return badRequest(res, MESSAGES.APP_API_KEY_MISSING_API_KEY_MISSING, HTTP_STATUS.UNAUTHORIZED)
      }
    }
   
    next();
  };
  
  module.exports = {apiKeyValidator};

