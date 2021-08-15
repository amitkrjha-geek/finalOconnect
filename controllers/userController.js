const User = require('../models/user');
const { validationResult } = require('express-validator/check');



exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const eMailId = req.body.eMailId;
    const content = req.body.content;
    const interests = req.body.interests;
    const githubUrl = req.body.githubUrl;
    const linkedInId = req.body.linkedInId;
    const education = req.body.education;
    const description = req.body.description;
    const portfolioWebsiteUrl = req.body.portfolioWebsiteUrl;
    const user = new User({
        name: name,
        eMailId: eMailId,
        content: content,
        interests: interests,
        githubUrl: githubUrl,
        linkedInId: linkedInId,
        education: education,
        description: description,
        portfolioWebsiteUrl: portfolioWebsiteUrl,

    });
    user
        .save()
        .then(result => {
            res.status(201).json({
                message: 'User created successfully!',
                post: result,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user => {
        if (!user) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;

        }

        res.status(200).json({ message: 'User Fetched', user: user, })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        throw err;
    });
}


exports.updateUserInfo = (req, res, next) => {
    const name = req.body.name,
    const eMailId = req.body.eMailId,
    const content = req.body.content,
    const interests = req.body.interests,
    const githubUrl = req.body.githubUrl,
    const linkedInId = req.body.linkedInId,
    const education = req.body.education,
    const description = req.body.description,
    const portfolioWebsiteUrl = req.body.portfolioWebsiteUrl,

    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user.');
                error.statusCode = 404;
                throw error;
            }
            post.name = name;
            post.eMailId = eMailId;
            post.content = content;
            post.interests = interests;
            post.githubUrl = githubUrl;
            post.linkedInId = linkedInId;
            post.education = education;
            post.description = description;
            post.portfolioWebsiteUrl = portfolioWebsiteUrl;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User data updated!', user: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}