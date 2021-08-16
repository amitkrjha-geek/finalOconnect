const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const responseSchema= new Schema({
    ans1:{
        type:String,
        required:true
    },
    ans2:{
         type:String,
         requred:true
    },
    User:
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required:true
        }
    },
    {timestamps:true}
)

exports.module('Response',responseSchema);