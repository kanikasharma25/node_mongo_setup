
const response = require('../../utils/response')
const adminAuthService = require('../../services/adminService/authAdminService');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');

class AuthAdminController {

    async login(req, res) {
        try {
            
            const { success, statusCode, msg, data } = await adminAuthService.loginUser(req.body);
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async adminProfile(req, res) {
        try {
            const adminId = req.user._id;
            const { success, statusCode, msg, data } = await adminAuthService.adminProfile(adminId);
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
            let adminId = req.user.id
            let { data, msg, success, statusCode } = await adminAuthService.updateProfile(filePath, adminId, req.body)
            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)

        } catch (error) {
            console.log(error, " =-=-=-=-=-=-= ERROR =-=-=-=-=-= ")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async changePassword(req, res) {
        try {

            let userId = req.user.id
            
            let { data, msg, success, statusCode } = await adminAuthService.changePassword( userId, req.body )

            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)

        } catch (error) {
            console.log(error, " =-=-=-=-=-=-= ERROR =-=-=-=-=-= ")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async logOut(req, res) {
        try {

            let userId = req.user.id
            
            let { data, msg, success, statusCode } = await adminAuthService.logOut( userId )

            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)

        } catch (error) {
            console.log(error, " =-=-=-=-=-=-= ERROR =-=-=-=-=-= ")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

    async forgetPassword(req, res) {
        try {
            let email= req.body.email
            
            let { data, msg, success, statusCode } = await adminAuthService.forgetPassword( email )

            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            console.log(error,"error=-=-=-=-=-=-")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message)
        }
    }

    async resetPassword(req, res) {
        try {
            
            let { data, msg, success, statusCode } = await adminAuthService.resetPassword( req.body )

            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            console.log(error,"error=-=-=-=-=-=-")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message)
        }
    }

}

module.exports = new AuthAdminController();
