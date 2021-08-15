const express = require('express');
const { body } = require('express-validator/check');
const userDatacontroller = require('../controllers/userController');

const router = express.Router();


router.get('/personalData', userDatacontroller.createUser);

router.post('/createUser', [
    body('Name').trim(),
    body('emailId').trim(),
    body('content').trim(),
    body('interests').trim(),
    body('githubUrl').trim(),
    body('linkedInUrl').trim(),
    body('education').trim(),
    body('description').trim(),
    body('portfolioWebsite').trim(),

], userDatacontroller.createUser);


router.put('/updateUserData', 
[body('Name').trim(),
body('emailId').trim(),
body('content').trim(),
body('interests').trim(),
body('githubUrl').trim(),
body('linkedInUrl').trim(),
body('education').trim(),
body('description').trim(),
body('portfolioWebsite').trim(),
], userDatacontroller.updateUserInfo);


module.exports=router;