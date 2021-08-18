const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const userAuthSchema= new Schema({
    email:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }

});
module.exports = mongoose.model('UserAuth', userAuthSchema);