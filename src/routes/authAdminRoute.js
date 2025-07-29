
const express = require('express');
const authAdminController = require('../controllers/adminController/authAdminController');
const { validateAdminLogin, validateAdminchangePassword, forgetPasswordValidate, resetPasswordValidate } = require('../validations/adminValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');


router.post('/login', validateAdminLogin, authAdminController.login);
 
router.use(verifyToken)
router.get('/adminProfile', authAdminController.adminProfile);

// upload.array('images', 5)
router.put('/updateProfile', upload.single('profileImage'), authAdminController.updateProfile);
router.patch('/changePassword', validateAdminchangePassword, authAdminController.changePassword);
router.get('/logOut', authAdminController.logOut);
router.post('/forgetPassword', forgetPasswordValidate, authAdminController.forgetPassword);
router.post('/resetPassword', resetPasswordValidate, authAdminController.resetPassword);
module.exports = router;
