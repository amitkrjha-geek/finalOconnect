const UserAuth = require('../models/user_auth');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        new error = new Error('Validation failed');
        error.statuscode = 422;
        error.data = errors.array();
        console.log(error);
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const userAuth = new UserAuth({
                email: email,
                password: hashedPassword,
                name: name.name,
            })
            return userAuth.save();
        }).then(result => {
            res.statuscode(201)
                .json({ message: 'User created successfully', userId: result._id})
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    UserAuth.findOne({ email: email }).then(user => {
        if (!user) {
            const error = new Error('Couldn,t find an user.');
            error.statuscode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(loadedUser.password, password);
        }
    ).then(isEqual => {
        if (!isEqual) {
            const error = new Error('Entered password is incorrect.');
            error.statuscode = 401;
            throw error;
        }
        const token = jwt.sign({
            email:loadedUser.email,
            userId:loadedUser._id,
        }, 'securitykeyforpassword',{expiresIn:'2h'});
        res.statuscode(200).json({token:token, userId:loadedUser._id
            //Code not able to identify .toString()
            // .toString()
        })
    })
        .catch(err => {
            if (!err.statusCode) {  
                err.statusCode = 500;
            }
            next(err);
        });
}