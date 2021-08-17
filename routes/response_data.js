const express=require('express');
const {body}=require('express-validator');
const responsecontroller=require('../controllers/responsecontroller');

const router=express.Router();
//get the response
router.post('/response/:postId/:responseId',

  [ body('ans1').trim(),
   body('ans2').trim()],
   
   responsecontroller.responsebyId
);

router.get('/response/:postId',responsecontroller.getbypost);

