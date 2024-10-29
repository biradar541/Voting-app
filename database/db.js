const mongoose =require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/voting",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to database');
})
 
db.on('disconnected',()=>{
    console.log('disconnected from database');
})

db.on('error',()=>{
    console.log('error occurred while connecting to database');
})

module.export=db;