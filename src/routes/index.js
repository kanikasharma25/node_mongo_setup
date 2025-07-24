
const express = require('express');
const router = express.Router();

// const usersRouter = require('./users');
// const authRouter = require('./auth');
// const categoryRouter = require('./category');
// const listingRouter = require('./listing');
// const homeRouter = require('./home');
// const userRouter = require('./user');
// const subscriptionPlan = require('./subscriptionPlan');
// const userSubscription = require('./userSubscription');

// router.use('/users', usersRouter);
// router.use('/user', userRouter);
// router.use('/auth', authRouter);
// router.use('/category', categoryRouter);
// router.use('/listing', listingRouter);
// router.use('/home', homeRouter);
// router.use('/subscriptionPlan', subscriptionPlan);
// router.use('/userSubscription', userSubscription);


router.get('/', (req, res) => {
    console.log("testing testing testing testing testing")
});

module.exports = router;
