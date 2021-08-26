const router = require('express').Router();
const passport = require('passport');

router.use(passport.initialize());
require('./../config/passport')(passport);

// partially protected routes
router.use('/user', require('./user'))

// protected routes
router.use(passport.authenticate('jwt', { session: false }))
router.use('/post', require('./post'))
router.use('/comments', require('./comment'))

module.exports = router;