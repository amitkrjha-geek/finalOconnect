const express=require('express');
const mongoose=require('mongoose')
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');


//app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded());



// handling of CORS Error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



//mongodb connection
mongoose.connect('mongodb://dboconnect:dboconnect2021@cluster0-shard-00-00.etqtv.mongodb.net:27017,cluster0-shard-00-01.etqtv.mongodb.net:27017,cluster0-shard-00-02.etqtv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1b6voy-shard-0&authSource=admin&retryWrites=true&w=majority').then(
    result=>{
    app.listen(3000);
    console.log('connect sucessfully')
})
.catch(err=>{
    console.log(err);
})