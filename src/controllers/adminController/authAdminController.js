
const response = require('../../utils/response')
const adminAuthService = require('../../services/adminService/authAdminService');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');

class AuthAdminController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { success, statusCode, msg, data} = await adminAuthService.loginUser(email, password);
            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR )
        }
    }

    async adminProfile(req, res) {
        try {
            const adminId = req.user._id;
            const { success, statusCode, msg, data} = await adminAuthService.adminProfile(adminId);
            if(!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR )
        }
    }

    async updateProfile(req, res) {
        try {
            
            let resp = await adminAuthService.updateProfile(req.user.id, req.body)
            console.log("reached to controller agian")
            return

        } catch (error) {
            console.log(error, " =-=-=-=-=-=-= ERROR =-=-=-=-=-= ")
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR )
        }
    }



}

module.exports = new AuthAdminController();
