
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/middlewares');


router.use(verifyToken)


router.use((req, res) => {
    badRequest(res, MESSAGES.INVALID_ROUTE, HTTP_STATUS.NOT_FOUND)
});

module.exports = router;
