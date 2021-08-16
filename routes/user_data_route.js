const express = require('express');
const { body } = require('express-validator/check');
const userDatacontroller = require('../controllers/userController');

const router = express.Router();

router.get('/allUsers',userDatacontroller.getAllUsers );


router.get('/personalData/:userId', userDatacontroller.getUser);

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


router.put('/updateUserData/:userId', 
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