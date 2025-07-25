
const express = require('express');
const router = express.Router();

const adminRoute = require('./authAdminRoute');
const { apiKeyValidator } = require('../middlewares/middlewares');

router.use('/admin', apiKeyValidator , adminRoute);


router.get('/', (req, res) => {
    res.send("API is working 👌");
});

module.exports = router;
