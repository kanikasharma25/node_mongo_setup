
const response = require('../../utils/response')
const authAppService = require('../../services/appService/authAppService');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');

class UserController {

    async login(req, res) {
        try {
            const { success, statusCode, msg, data } = await authAppService.loginUser(req.body);
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async verifyOtp(req, res) {
        try {
            let userId = req.user.id
            const { success, statusCode, msg, data } = await authAppService.verifyOtp(req.body, userId);
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async resendOtp(req, res) {
        try {

            let userId = req.user.id
            let type = req.params.type
            const { success, statusCode, msg, data } = await authAppService.resendOtp(userId, type);

            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async forgetPass(req, res) {
        try {

            const { success, statusCode, msg, data } = await authAppService.forgetPass(req.body);

            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async resetPass(req, res) {
        try {
            let userId = req.user.id
            const { success, statusCode, msg, data } = await authAppService.resetPass(req.body, userId);

            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async updateProfile(req, res) {
        try {

            let filePath = req.file
            let userId = req.user.id
            let { data, msg, success, statusCode } = await authAppService.updateProfile(filePath, userId, req.body)
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)

        } catch (error) {
            console.log(error, " =-=-=-=-=-=-= ERROR =-=-=-=-=-= ")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

}

module.exports = new UserController();
