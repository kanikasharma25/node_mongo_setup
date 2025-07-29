
const User = require('../../models/user.model');
const { MESSAGES, HTTP_STATUS, ROLES } = require('../../constants/constants');
const { jwtTokenGenerate, comparePassword } = require('../../utils/helper')

class UserService {

    // Login user
    async createUser(body) {
        const exists = await User.findOne({ email: body.email });
        if (exists) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.EMAIL_EXISTS
            }
        }

        let newUser = await User.create({
            ...body
        })

        

        return {
            success: true,
            statusCode: HTTP_STATUS.CREATED,
            data: newUser,
            msg: MESSAGES.USER_CREATE_SUCCESS
        }

    }

}

module.exports = new UserService();
