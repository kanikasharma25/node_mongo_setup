
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const { MESSAGES, HTTP_STATUS, ROLES } = require('../../constants/constants');
const { jwtTokenGenerate } = require('../../utils/helper')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

class AuthAdminService {

    // Login user
    async loginUser(email, password) {
        const user = await User.findOne({ email: email, role: ROLES.ADMIN });
        if (!user) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.INVALID_CREDENTIALS
            }
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
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

    async updateProfile(files, adminId, data) {
        let updateData = data
        if (files && files.path) {
            updateData.profileImage = files.path
            let u = await User.findById(adminId).select('profileImage')
            if (u && u.profileImage) {
                console.log(' =-=-=-=-=-=-=-=-     Need to delete old image path     =-=-=-=-=-=-=-==-=-= ');
                const oldImagePath = path.join(__dirname, '../../../', u.profileImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('Old profile image deleted:', oldImagePath);
                }
            }

        }
        let updateCount = await User.updateOne(
            { _id: adminId },
            {
                $set: {
                    ...updateData
                }
            }
        )

        let user = await User.findById(adminId).select('_id firstName lastName email profileImage')

        if (updateCount.modifiedCount > 0) {
            return {
                success: true,
                statusCode: HTTP_STATUS.OK,
                msg: MESSAGES.PROFILE_UPDATE_PASS,
                data: user
            }
        } else {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.PROFILE_UPDATE_FAIL,
            }
        }

    }

    async changePassword(adminId, data) {
        let admin = await User.findById(adminId)

        let isMatched = bcrypt.compareSync(data.oldPassword, admin.password)

        if (!isMatched) {
            return {
                success: false,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                msg: MESSAGES.WRONG_OLD_PASSWORD,
            }
        }
        let cryptedPass = bcrypt.hashSync(data.newPassword, 10)
        let adminUpdate = await User.updateOne(
            { _id: adminId },
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

    async logOut(adminId, data) {

        let adminUpdate = await User.updateOne(
            { _id: adminId },
            {
                $set: {
                    tokenChecker: ""
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


        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const resetLink = `baseURL/admin/reset-password?token=${token}`;


        const mailOptions = {
            from: `"Admin Support" <${process.env.SMTP_USER}>`,
            to: exists.email,
            subject: "Password Reset Link",
            html: `
      <h3>Password Reset Requested</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
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

}

module.exports = new AuthAdminService();
