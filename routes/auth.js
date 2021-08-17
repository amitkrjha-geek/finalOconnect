const express = require('express');
const { body } = require('express-validator');
const UserAuth = require('../models/user_auth');
const authController = require('../controllers/auth');


const router = express.Router();

router.put('/signup', [
    body('email').isEmail().withMessage('Please enter valid email').custom((value, { req }) => {
        return UserAuth.findOne({ email: value }).then(userdoc => {
            if (userdoc) {
                return Promise.reject('Email address already exists');
            }
        });
    }).normalizeEmail(),
    body('password').trim().isLength({min:6}),
    body('name').trim().notEmpty(),
],authController.signup);

router.post('/login', authController.login);

module.exports = router;
