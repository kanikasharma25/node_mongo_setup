
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const { MESSAGES, HTTP_STATUS } = require('../../constants/constants');
const { jwtTokenGenerate } = require('../../utils/helper')

class AuthAdminService {

    // Login user
    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                data: {},
                msg: MESSAGES.INVALID_CREDENTIALS
            }
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                data: {},
                msg: MESSAGES.INVALID_CREDENTIALS
            }
        }

        let rndm = Math.random().toString();
        user.tokenChecker = rndm   
        const savedUser = await user.save();

        const payload = { _id: savedUser._id, email: savedUser.email, tokenTracker: savedUser.tokenTracker };
        const token = await jwtTokenGenerate(payload)

        let userData = {
            ...savedUser.toObject(),
            token
        }

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            data: userData,
            msg: MESSAGES.LOGIN_DONE
        }
        
    }

    // Verify JWT Token
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error('Invalid or expired token.');
        }
    }

    // Reset Password
    async resetPassword(userId, newPassword) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return { message: 'Password updated successfully.' };
    }
}

module.exports = new AuthAdminService();
