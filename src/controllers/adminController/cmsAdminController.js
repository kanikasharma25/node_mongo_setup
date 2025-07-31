
const response = require('../../utils/response');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');
const cmsAdminService = require('../../services/adminService/cmsAdminService');

class CmsController {

    async getCms(req, res) {
        try {
            let type = req.params.type
            const { success, statusCode, msg, data } = await cmsAdminService.getCms(type);
            if (!success) {
                return response.badRequest(res, msg, statusCode)
            }
            return response.success(res, msg, data, statusCode)
        } catch (error) {
            return response.serverError(res, MESSAGES.SERVER_ERROR, error.message, HTTP_STATUS.SERVER_ERROR)
        }
    }

}

module.exports = new CmsController();
