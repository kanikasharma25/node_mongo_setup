
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

    async updateProfile(req, res) {
        try {
            const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
            res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new AuthAdminController();
