
const User = require('../../models/user.model');
const { MESSAGES, HTTP_STATUS, ROLES } = require('../../constants/constants');
const { jwtTokenGenerate, transporter, hashedPassword, comparePassword, generateSecureOtp } = require('../../utils/helper')

class AuthAdminService {

    // Login user
    async loginUser(body) {
        let { email, password, deviceToken } = body
        const user = await User.findOne({ email: email, role: ROLES.SALES_REP });
        if (!user) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.INVALID_CREDENTIALS
            }
        }

        if (user.password === '') {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.CREATE_PASSWORD
            }
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.INVALID_CREDENTIALS
            }
        }

        let rndm = Math.random().toString();
        let otp = generateSecureOtp()
        user.tokenChecker = rndm
        user.deviceToken = deviceToken
        user.otp = otp
        user.isOtpVerified = false

        const savedUser = await user.save();

        const payload = { _id: savedUser._id, email: savedUser.email, tokenChecker: savedUser.tokenChecker };
        const token = await jwtTokenGenerate(payload)

        // let userData = {
        //     ...savedUser.toObject(),
        //     token
        // }

        const mailOptions = {
            from: `"Admin Support" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Verification code for login",
            html: `
          <h3>Verification code for login - RPRT</h3>
          <p>OTP: ${otp}</p>
        `,
        };

        await transporter.sendMail(mailOptions);

        let dataObj = {
            token,
            otp
        }

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            data: dataObj,
            msg: MESSAGES.OTP_ON_EMAIL
        }

    }

    async verifyOtp(body, userId) {
        let user = await User.findOne({ _id: userId })
        if (!user) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.NOT_FOUND
            }
        }
        if (user.otp !== body.otp) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.OTP_INVALID
            }
        }
        user.otp = "",
        user.isOtpVerified = true;
        let savedUser = await user.save()

        const payload = { _id: savedUser._id, email: savedUser.email, tokenChecker: savedUser.tokenChecker };
        const token = await jwtTokenGenerate(payload)

        let userData = {
            ...savedUser.toObject(),
            token
        }

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            data: userData,
            msg: MESSAGES.OTP_VERIFIED_SUCCESS
        }
    }

}

module.exports = new AuthAdminService();
