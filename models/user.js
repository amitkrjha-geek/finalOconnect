const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: true,
    },
    eMailId: {
        type: String,
        required: true
    },
    content: {
        type: String
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
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
      ]

},
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);