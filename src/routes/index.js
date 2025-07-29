
const express = require('express');
const router = express.Router();

const adminRoute = require('./adminRoute');
const appRoute = require('./appRoute');
const { apiKeyValidator } = require('../middlewares/middlewares');

router.use(apiKeyValidator)
router.use('/admin', adminRoute);
router.use('/app', appRoute);


router.get('/', (req, res) => {
    res.send("API is working");
});

module.exports = router;
