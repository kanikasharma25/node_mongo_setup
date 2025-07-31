
const express = require('express');
const router = express.Router();
const authAppController = require('../controllers/appController/authAppController');
const { validateLogin, validateVerifyOtp, validateForgetPass, validateResetPass } = require('../validations/appValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const { badRequest } = require('../utils/response');
const { MESSAGES, HTTP_STATUS } = require('../constants/constants');
const cmsAdminController = require('../controllers/adminController/cmsAdminController');


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    AUTH      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.post('/login', validateLogin, authAppController.login);
router.post('/forgetPass', validateForgetPass, authAppController.forgetPass);

router.use(verifyToken)
router.post('/verifyOtp', validateVerifyOtp, authAppController.verifyOtp);
router.post('/resendOtp/:type', authAppController.resendOtp);
router.post('/resetPass', validateResetPass, authAppController.resetPass);


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    CMS      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.get('/cms/:type', cmsAdminController.getCms);



router.use((req, res) => {
    badRequest(res, MESSAGES.INVALID_ROUTE, HTTP_STATUS.NOT_FOUND)
});

module.exports = router;
