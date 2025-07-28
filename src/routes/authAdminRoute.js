const express = require('express');
const authAdminController = require('../controllers/adminController/authAdminController');
const { validateAdminLogin } = require('../validations/adminValidate/authValidation');
const { verifyToken } = require('../middlewares/middlewares');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');


router.post('/login', validateAdminLogin, authAdminController.login);
router.get('/adminProfile', verifyToken, authAdminController.adminProfile);
router.put('/updateProfile', verifyToken, upload.single('profileImage'), authAdminController.updateProfile);

module.exports = router;
