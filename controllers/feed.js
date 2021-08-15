const {validationResult}=require('express-validator');
const Post=require('../models/post');
const User=require('../models/user');


exports.getPosts=(req,res,next)=>{
    //To-Do- Add pagination

    Post.find().then(posts=>{
        res.status(200).json({
            message:'Fetched posts sucessfully',
            posts:posts
        });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

//createpost

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
   
    const companyname = req.body.companyname;
    const linkedlnurl = req.body.linkedlnurl;
    const websiteurl = req.body.websiteurl;
    const mode = req.body.mode;
    const startdate = req.body.startdate;
    const Duration = req.body.Duration;
    const stipend = req.body.stipend;

    const applyby = req.body.applyby;
    const field = req.body.field;
    const wca = req.body.wca;
    const skillreq = req.body.skillreq;
    const perks = req.body.perks;
    const q1 = req.body.q1;
    const q2 = req.body.q2;
    
    let creator;
    const post = new Post({
         companyname : companyname,
         linkedlnurl : linkedlnurl,
         websiteurl : websiteurl,
         mode : mode,
         startdate : startdate,
         Duration : Duration,
         stipend : stipend,
         field : field,
         applyby:applyby,
         wca :wca,
         skillreq :skillreq,
         perks : perks,
         q1 : q1,
         q2 : q2,
      creator: req.userId
    });
    post
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
        return User.findById(req.userId);
      })
      // .then(user => {
      //   creator = user;
      //   user.post.push(post);
      //   return user.save();
      // })
      // .then(result => {
      //   res.status(201).json({
      //     message: 'Post created successfully!',
      //     post: post,
      //     // creator: { _id: creator._id, name: creator.name }
      //   });
      // })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  //getpostbyid
  exports.getPostbyid = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Post fetched.', post: post });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  //updatepostid
  exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const companyname = req.body.companyname;
    const linkedlnurl = req.body.linkedlnur;
    const websiteurl = req.body.websiteurl;
    const mode = req.body.mode;
    const startdate = req.body.startdate;
    const Duration = req.body.Duration;
    const stipend = req.body.applyby;
    const field = req.body.field;
    
    const wca = req.body.wca;
    const skillreq = req.body.skillreq;
    const perks = req.body.perks;
    const q1 = req.body.q1;
    const q2 = req.body.q2;
    
    Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        //if (post.creator.toString() !== req.userId) {
        //  const error = new Error('Not authorized!');
         // error.statusCode = 403;
        //  throw error;
        //}
        post.companyname = companyname;
         post.linkedlnurl = linkedlnur;
         post.websiteurl = websiteurl;
         post.mode = mode;
         post.startdate = startdate;
         post.Duration = Duration;
         post.stipend = applyby;
         post.field = field;
        
         post.wca =wca;
         post.skillreq =skillreq;
         post.perks = perks,
         post.q1 = q1;
         post.q2 = q2;
       
        return post.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Post updated!', post: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        //if (post.creator.toString() !== req.userId) {
        //  const error = new Error('Not authorized!');
         // error.statusCode = 403;
         // throw error;
       // }
        // Check logged in user
        
        return Post.findByIdAndRemove(postId);
      })
      .then(result => {
        return User.findById(req.userId);
      })
      .then(user => {
        user.posts.pull(postId);
        return user.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Deleted post.' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  