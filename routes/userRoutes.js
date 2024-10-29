const express =require('express');
const router=express.Router();
const User=require('./../models/user')

//Post route to add a person
router.post('/signup',async(req,resp)=>{
    try{
        const user=new User(req.body);
        const response=await user.save();
        console.log('data saved');

        const payload={
            id:response.id
        }
        console.log(JSON.stringify(payload));
        const token=genrateTocken(payload);
        console.log("Token is :",token);
        resp.status(200).send(user);
    }catch(err){
        console.log(err);
        resp.status(500).json({error: 'Internal Server Error'})
    }
})

//Login route

router.post('/login',async(req,resp)=>{
    try{
        //Extract username and password from request body
        const {aadharCardNumber,password}=req.body;

        //find user by username
        const user=await User.findOne({aadharCardNumber:aadharCardNumber});

        //if user does not exist or password does not match return error
        if(!user || !(await user.comparePassword(password))){
            return resp.status(401).json({error:'Invalid username or password'})
        }

        //generate token
        const payload={
            id:user.id, 
        }
        //return token as response
        resp.send(token);
    }
    catch(err){
        resp.status(500).json({error: 'Internal Server Error'});
    }
})

//Profile route

router.get('/profile',jwtAuthMiddleware,async(req,resp)=>{
    try{
        const userData=req.user;
        const userId=userData.id;
        const user=await User.findById(userId);
        resp.status(200).json({user});
    }catch(err){
        console.log(err);
        resp.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/profile/password',jwtAuthMiddleware, async(req,resp)=>{
    try{
        const userId=req.user;//Extract the id from the token
        const {currentPassword,newPassword}=req.body;
        const user=await User.findById(userId)
        if(!(await user.comparePassword(currentPassword))){
            return resp.status(401).json({error:'Invalid username or password'})
        }
        //update password
        user.password=newPassword;
        await user.save();
        console.log('password updated')
    }catch(err){
        console.log(err);
        resp.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports=router;