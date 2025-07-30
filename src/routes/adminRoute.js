
const express = require('express');
const { validateAdminLogin, validateAdminchangePassword, forgetPasswordValidate, resetPasswordValidate } = require('../validations/adminValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const authAdminController = require('../controllers/adminController/authAdminController');
const userController = require('../controllers/adminController/userController');
const { createUserValidate } = require('../validations/adminValidate/userValidation');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    AUTH      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.post('/login', validateAdminLogin, authAdminController.login);
router.post('/forgetPassword', forgetPasswordValidate, authAdminController.forgetPassword);
router.post('/resetPassword', resetPasswordValidate, authAdminController.resetPassword);

router.use(verifyToken)
router.get('/adminProfile', authAdminController.adminProfile);

// upload.array('images', 5)
router.put('/updateProfile', upload.single('profileImage'), authAdminController.updateProfile);
router.patch('/changePassword', validateAdminchangePassword, authAdminController.changePassword);
router.get('/logOut', authAdminController.logOut);


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    USER      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.post('/createUser', createUserValidate, userController.createUser )


module.exports = router;
