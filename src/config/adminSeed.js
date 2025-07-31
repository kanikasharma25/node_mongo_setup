
const User = require('../models/user.model');
const Cms = require('../models/cms.model');
const { ROLES, CMS_TYPE } = require('../constants/constants');
const { hashedPassword } = require('../utils/helper');

const adminSeed = async (email, password) => {
    
    const exists = await User.findOne({role: 'admin'})
    const existsPrivacy = await Cms.findOne({type: CMS_TYPE.PRIVACY})
    const existsTerms = await Cms.findOne({type: CMS_TYPE.TERMS})

    if(exists){
        console.log("Admin exists")
    } else {
        await User.create({
            firstName: 'Admin',
            lastName: 'admin',
            email: email,
            password: await hashedPassword(password),
            role: ROLES.ADMIN
        })
        console.log("Admin created")
    }

    if(!existsPrivacy){
        await Cms.create({
            title: 'Privacy Policies',
            content: 'Place content for privacy policies here',
            type: CMS_TYPE.PRIVACY
        })
    }

    if(!existsTerms){
        await Cms.create({
            title: 'Terms of services',
            content: 'Place content for terms of services here',
            type: CMS_TYPE.TERMS
        })
    }

};

adminSeed('admin@gmail.com', '123456', );
