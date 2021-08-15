const mongoose=require('mongoose');
const User = require('./user');

const Schema=mongoose.Schema;

const postSchema=new Schema({
    creator:{
        type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    companyname:{
        type:String,
        required:true
    },
    linkedlnurl:{
        type:String,
        required:true
    },
    websiteurl:{
        type:String
    },
    mode:{
        type:String,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    stipend:{
        type:String,
        
    },
    applyby:{
        type:String,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    wca:{
        type:String,
        required:true
    },
    skillreq:{
        type:String,
        required:true
    },
    perks:{
        type:String,
        required:true
    },
    q1:{
        type:String,
        required:true
    },
    q2:{
        type:String,
        required:true
    }
},
{timestamps:true}
);
module.exports=mongoose.model('Post',postSchema);