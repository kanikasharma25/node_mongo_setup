
const express = require('express');
const router = express.Router();
const authAppController = require('../controllers/appController/authAppController');
const { validateLogin, validateVerifyOtp } = require('../validations/appValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-    AUTH      =-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-
router.post('/login', validateLogin, authAppController.login);

router.use(verifyToken)
router.post('/verifyOtp', validateVerifyOtp, authAppController.verifyOtp);
router.post('/resendOtp', authAppController.resendOtp);



module.exports = router;
