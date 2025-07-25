const { HTTP_STATUS } = require("../constants/constants")

// const HTTP_STATUS = {
//     OK: 200,
//     CREATED: 201,
//     BAD_REQUEST: 400,
//     UNAUTHORIZED: 401,
//     NOT_FOUND: 404,
//     CONFLICT: 409,
//     SERVER_ERROR: 500,
// };

const success = (res, msg = "", data = {}, statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        msg: msg,
        data: data
    })
}

const badRequest = (res, msg = "", statusCode = HTTP_STATUS.NOT_FOUND, error= {}) => {
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        msg: msg,
        error: error
    })
}

const serverError = (res, msg = "", error = {}, statusCode = HTTP_STATUS.SERVER_ERROR) => {
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        msg: msg,
        error: error,
    })
}

module.exports = {
    success,
    badRequest,
    serverError,
  };
