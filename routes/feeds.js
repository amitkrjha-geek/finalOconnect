const express=require('express');
const {body}=require('express-validator');
const feedcontroller=require('../controllers/feed');

const router=express.Router();

//GET/Feed/posts
router.get('/posts',feedcontroller.getPosts);

//Post/feed/post

router.post('/post',
[
    body('companyname').trim(),
    body('linkedlnurl').trim(),
    body('websiteurl').trim(),
    body('mode').trim(),
    body('startdate').trim(),
    body('Duration').trim(),
    body('stipend').trim(),
    body('applyby').trim(),
    body('field').trim(),
    body('wca').trim(),
    body('skillreq').trim(),
    body('perks').trim(),
    body('q1').trim(),
    body('q2').trim()
],
feedcontroller.createPost
);
router.get('/post/:postId',feedcontroller.getPostbyid);


router.put('/post/:postId',
[
    body('companyname').trim(),
    body('linkedlnurl').trim(),
    body('websiteurl').trim(),
    body('mode').trim(),
    body('startdate').trim(),
    body('Duration').trim(),
    body('stipend').trim(),
    body('applyby').trim(),
    body('field').trim(),
    body('wca').trim(),
    body('skillreq').trim(),
    body('perks').trim(),
    body('q1').trim(),
    body('q2').trim()
],
feedcontroller.updatepost
);




router.delete('/post/:postId',feedcontroller.deletePost)
module.exports=router;