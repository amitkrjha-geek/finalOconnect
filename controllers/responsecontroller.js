const {validationResult}=require('express-validator');
const Post=require('../models/post');
const User=require('../models/user');
const Response=require('../models/response');

exports.getbypost=(req,res,next)=>{
    const postId=req.params.postId;
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Response fetched.', response: post.responses });
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};
exports.responsebypost=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const postId=req.params.postId;
    const ans1=req.body.ans1;
    const ans2=req.body.ans2;
    let applicant;
    const response= new Response({
        ans1:ans1,
        ans2:ans2,
        applicant:req.body.userId
    });
    response
    .save()
    .then(
        Post.findById(postId)
        .then(post=>{
            post.responses.push(response);
            return post.save();
        })
        .catch(
            err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);}
        )
    )
    .then(result => {
      console.log(result);
      res.status(200).json(result);
      return User.findById(req.userId);
    })
    
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    


}