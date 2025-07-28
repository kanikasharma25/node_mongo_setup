
const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const { ROLES } = require('../constants/constants');

const adminSeed = async (email, password) => {
    const exists = await User.findOne({role: 'admin'})
    if(exists){
        console.log("Admin exists")
    } else {
        await User.create({
            firstName: 'Admin',
            lastName: 'admin',
            email: email,
            password: bcrypt.hashSync(password,10),
            role: ROLES.ADMIN
        })
        console.log("Admin created")
    }
};

adminSeed('admin@gmail.com', '123456', );
