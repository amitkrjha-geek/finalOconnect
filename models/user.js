const mongoose = require('mongoose');
const Post=require('./post');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    eMailId: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String
    },
    linkedInId: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true,
    },
    portfolioWebsiteUrl: {
        type: String,
    },
    userRespondedtoPosts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          default:[],
        }
      ]

},
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);