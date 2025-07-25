const express = require('express');
const authAdminController = require('../controllers/adminController/authAdminController');
const { validateAdminLogin } = require('../validations/adminValidate/authValidation');
const router = express.Router();

router.post('/login', validateAdminLogin, authAdminController.login);
module.exports = router;
