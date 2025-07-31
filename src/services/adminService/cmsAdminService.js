
const Cms = require('../../models/cms.model');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');

class CmsService {

    // Login user
    async getCms(type) {
        const exists = await Cms.findOne({ type });
        if (!exists) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.NOT_FOUND
            }
        }

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            data: exists,
            msg: MESSAGES.CMS_LOADED
        }

    }

    async updateCms(body) {
        let {id, content} = body
        const exists = await Cms.findOne({ _id: id });
        if (!exists) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.NOT_FOUND
            }
        }

        exists.content= content
        await exists.save()
        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            data: exists,
            msg: MESSAGES.CMS_LOADED
        }

    }

}

module.exports = new CmsService();
