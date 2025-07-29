
const response = require('../../utils/response');
const userService = require('../../services/adminService/userService');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');

class UserController {

    async createUser(req, res) {
        try {
            const { success, statusCode, msg, data } = await userService.createUser(req.body);
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

}

module.exports = new UserController();
