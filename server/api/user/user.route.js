const express = require('express');

const router = express.Router();
const UserController = require('./user.controller');

router.route('').get(UserController.anonymousSignIn);

/** POST /api/users/anonymous-sign-in - sign in anonymously and get a JWT */
router.route('/anonymous-sign-in').post(UserController.anonymousSignIn);

module.exports = router;
