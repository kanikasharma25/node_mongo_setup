const express = require('express');
const authAdminController = require('../controllers/adminController/authAdminController');
const { validateAdminLogin } = require('../validations/adminValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const router = express.Router();

router.post('/login', validateAdminLogin, authAdminController.login);
router.get('/adminProfile', verifyToken, authAdminController.adminProfile);

module.exports = router;
