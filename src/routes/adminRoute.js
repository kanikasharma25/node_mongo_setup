
const express = require('express');
const { validateAdminLogin, validateAdminchangePassword, forgetPasswordValidate, resetPasswordValidate } = require('../validations/adminValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const authAdminController = require('../controllers/adminController/authAdminController');
const userController = require('../controllers/adminController/userController');
const { createUserValidate } = require('../validations/adminValidate/userValidation');
const { badRequest } = require('../utils/response');
const { MESSAGES, HTTP_STATUS } = require('../constants/constants');
const cmsAdminController = require('../controllers/adminController/cmsAdminController');
const { cmsValidation } = require('../validations/adminValidate/cmsValidation');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    AUTH      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-

router.post('/login', validateAdminLogin, authAdminController.login);
router.post('/forgetPassword', forgetPasswordValidate, authAdminController.forgetPassword);
router.post('/resetPassword', resetPasswordValidate, authAdminController.resetPassword);

router.use(verifyToken)
// router.get('/adminProfile', authAdminController.adminProfile);

// upload.array('images', 5)
router.put('/updateProfile', upload.single('profileImage'), authAdminController.updateProfile);
router.patch('/changePassword', validateAdminchangePassword, authAdminController.changePassword);
router.get('/logOut', authAdminController.logOut);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    USER      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.post('/createUser', createUserValidate, userController.createUser)


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    CMS      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.get('/cms/:type', cmsAdminController.getCms)
router.patch('/cms', cmsValidation, cmsAdminController.updateCms)

router.use((req, res) => {
    badRequest(res, MESSAGES.INVALID_ROUTE, HTTP_STATUS.NOT_FOUND)
});


module.exports = router;

