
const User = require('../../models/user.model');
const { MESSAGES, HTTP_STATUS, ROLES } = require('../../constants/constants');
const { jwtTokenGenerate, transporter, hashedPassword, comparePassword } = require('../../utils/helper')
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AuthAdminService {

    // Login user
    async loginUser(body) {
        let { email, password } = body
        const user = await User.findOne({ email: email, role: ROLES.ADMIN });

        if (!user) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.INVALID_CREDENTIALS
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
        user.tokenChecker = rndm
        const savedUser = await user.save();

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
            msg: MESSAGES.LOGIN_DONE
        }

    }

    async adminProfile(adminId) {
        
        let adminDetail = await User.findOne({ _id: adminId }).select('_id firstName lastName email role')

        if (!adminDetail) {
            return {
                success: false,
                msg: MESSAGES.NOT_FOUND,
                statusCode: HTTP_STATUS.BAD_REQUEST
            }
        }

        return {
            success: true,
            msg: MESSAGES.PROFILE_LOADED,
            statusCode: HTTP_STATUS.OK,
            data: adminDetail
        }

    }

    async updateProfile(file, adminId, data) {
        const allowedFields = ['firstName', 'lastName'];
        let updateData = {};
    
        // Pick only allowed fields from input
        allowedFields.forEach((key) => {
            if (data[key]) {
                updateData[key] = data[key];
            }
        });
    
        // If profile image is being updated
        if (file && file.path) {
            updateData.profileImage = `/profile/${file.filename}`;
    
            // Delete old image if exists
            const existingUser = await User.findById(adminId).select('profileImage');
            if (existingUser && existingUser.profileImage) {
                const oldImagePath = path.join(__dirname, '../../uploads/', existingUser.profileImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('Old profile image deleted:', oldImagePath);
                }
            }
        }
    
        // Update the user
        const updateResult = await User.updateOne(
            { _id: adminId },
            { $set: updateData }
        );
    
        const updatedUser = await User.findById(adminId).select('_id firstName lastName email profileImage');
    
        if (updateResult.modifiedCount > 0) {
            return {
                success: true,
                statusCode: HTTP_STATUS.OK,
                msg: MESSAGES.PROFILE_UPDATE_PASS,
                data: updatedUser
            };
        } else {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.PROFILE_UPDATE_FAIL,
            };
        }
    }
    
    async changePassword(userId, data) {
        let user = await User.findById(userId)

        let isMatched = await comparePassword(data.oldPassword, user.password)

        if (!isMatched) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.WRONG_OLD_PASSWORD,
            }
        }
        let cryptedPass = await hashedPassword(data.newPassword)
        let userUpdate = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    password: cryptedPass
                }
            }
        )

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            msg: MESSAGES.PASSWORD_UPDATED,
            data: {}
        }

    }

    async logOut(userId, data) {

        let userUpdate = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    tokenChecker: "",
                    deviceToken: ""
                }
            }
        )

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            msg: MESSAGES.LOGOUT_DONE,
            data: {}
        }

    }

    async forgetPassword(email) {

        let exists = await User.findOne({ email: email, role: ROLES.ADMIN })

        if (!exists) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.NOT_FOUND,
            }
        }


        const token = crypto.randomBytes(32).toString("hex");
        const expireTime = Date.now() + 1000 * 60 * 15;


        exists.resetToken = token;
        exists.resetTokenExpires = expireTime;
        await exists.save();
        let appBaseUrl = process.env.APP_BASE_URL
        console.log(appBaseUrl, "=-=-=-=-=-=-=-=-=-    appBaseUrl     =-=-=-=-=-=-=-=-=-=-")

        const resetLink = `${appBaseUrl}/create-new-password?token=${token}`;
console.log(resetLink, "=-=-=-=-=-=-=-=-=-    resetLink     =-=-=-=-=-=-=-=-=-=-")



        const mailOptions = {
            from: `"RPRT Support" <${process.env.SMTP_USER}>`,
            to: exists.email,
            subject: "RPRT - Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello ${exists.firstName || 'User'},</p>
                    <p>We received a request to reset your RPRT account password. Click the link below to set a new password:</p>
                    <p>
                        <a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
                            Reset Password
                        </a>
                    </p>
                    <p>If the button above doesn't work, you can also copy and paste the following URL into your browser:</p>
                    <p><a href="${resetLink}">${resetLink}</a></p>
                    <p><strong>Note:</strong> This link will expire in 15 minutes for security reasons.</p>
                    <p>If you did not request this change, you can safely ignore this email.</p>
                    <br/>
                    <p>Regards,<br/>RPRT Support Team</p>
                </div>
            `,
        };
        

        await transporter.sendMail(mailOptions);
        let data = {
            token: token
        }
        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            msg: MESSAGES.RESET_PASSWORD_EMAIL_DELIVERED,
            data: data
        }

    }

    async resetPassword(body) {

        let exists = await User.findOne({ resetToken: body.resetToken })

        if (!exists) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.NOT_FOUND,
            }
        }

        if (exists.resetTokenExpires && exists.resetTokenExpires < Date.now()) {
            return {
                success: false,
                statusCode: HTTP_STATUS.UNAUTHORIZED,
                msg: MESSAGES.RESET_TOKEN_EXPIRED,
            };
        }

        let hiddenPass = await hashedPassword(body.newPassword)
        exists.password = hiddenPass
        exists.resetToken = null;
        exists.resetTokenExpires = null;
        await exists.save()

        return {
            success: true,
            statusCode: HTTP_STATUS.OK,
            msg: MESSAGES.RESET_PASSWORD_SUCCESS,
            data: {}
        }

    }

}

module.exports = new AuthAdminService();
