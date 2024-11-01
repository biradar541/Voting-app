const express =require('express')
const app=express();
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;

const db=require('./database/db')
//Import the router files
const userRoutes =require('./routes/userRoutes')

//Use the router
app.use('/user',userRoutes);
app.listen(PORT,()=>{
    console.log("Listening on port 3000");
    
})