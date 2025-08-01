
const express = require('express');
const router = express.Router();

const adminRoute = require('./adminRoute');
const appRoute = require('./appRoute');
const salesForce = require('./salesForceRoute');
const { apiKeyValidator } = require('../middlewares/middlewares');

router.use(apiKeyValidator)
router.use('/admin', adminRoute);
router.use('/app', appRoute);
router.use('/salesForce', salesForce);


router.get('/', (req, res) => {
    res.send("API is working");
});

module.exports = router;
