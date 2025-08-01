
const User = require('../../models/user.model');
const { MESSAGES, HTTP_STATUS, ROLES } = require('../../constants/constants');
const { jwtTokenGenerate, comparePassword, hashedPassword, transporter } = require('../../utils/helper')

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

    let hashedPass = await hashedPassword('12345678')
    let newUser = await User.create({
      ...body,
      password: hashedPass
    })

    const mailOptions = {
      from: `"RPRT Support Team" <${process.env.SMTP_USER}>`,
      to: newUser.email,
      subject: "Welcome to RPRT - Your Account Details",
      html: `
              <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
                <h2>Welcome to RPRT!</h2>
                <p>Dear User,</p>
                <p>Your account has been successfully created. Below are your login credentials:</p>
                
                <ul>
                  <li><strong>Email:</strong> ${newUser.email}</li>
                  <li><strong>Temporary Password:</strong> 12345678</li>
                </ul>
          
                <p>For security reasons, we strongly recommend updating your password after logging in to the app.</p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
          
                <br/>
                <p>Best regards,</p>
                <p><strong>RPRT Support Team</strong></p>
              </div>
            `,
    };

    await transporter.sendMail(mailOptions);


    return {
      success: true,
      statusCode: HTTP_STATUS.CREATED,
      data: newUser,
      msg: MESSAGES.USER_CREATE_SUCCESS
    }

  }

  async listUsers(page, limit) {
    page = parseInt(page)
    limit = parseInt(limit)
    let offset = (page - 1) * limit
    const users = await User.find({ deletedAt: false, role: { $ne: ROLES.ADMIN } }).sort({ createdAt: -1 }).skip(offset).limit(limit);

    const totalRecords = await User.countDocuments({
      deletedAt: false,
      role: { $ne: ROLES.ADMIN }
    });

    const totalPages = Math.ceil(totalRecords / limit);

    let respObj = {
      users,
      page: page,
      limit: limit,
      totalRecords,
      totalPages
    }

    return {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: respObj,
      msg: MESSAGES.USER_LIST_LOADED
    }

  }

  async statusUserUpdate(userId, status) {
    
    await User.updateOne(
      {_id: userId},
      {
        $set: {
          status: status
        }
      }
    );

    let user = await User.findOne({_id: userId})

    return {
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: user,
      msg: MESSAGES.USER_STATUS_UPDATED
    }

  }

}

module.exports = new UserService();
