
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
      let adminDetail = await User.findOne({_id: adminId}).select('_id firstName lastName email role')
      if(!adminDetail) {
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

    async updateProfile(adminId, data){
       console.log("Am going to update admin profile");
       console.log(adminId, "adminId adminId adminId adminId adminId") 
       console.log(data, "data data data data data") 
    }



}

module.exports = new AuthAdminService();
