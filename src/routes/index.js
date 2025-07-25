
const express = require('express');
const router = express.Router();

const adminRoute = require('./authAdminRoute');

router.use('/admin', adminRoute);


router.get('/', (req, res) => {
    console.log("testing testing testing testing testing")
    res.send("API is working 👌");
});

module.exports = router;
