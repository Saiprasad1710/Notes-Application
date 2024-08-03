const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const jwt_secret = "saiprasad@123";

//Route 1:
//create a user using : POST "/api/auth/" doesnt require auth
router.post('/createuser',[
    body('name','name must be atleast 3 characters').isLength({min:3}),
    body('password','password must be atleast 5 characters').isLength({min:5}),
    body('email','Enter a valid email').isEmail()
],async (req,res) => {

    let success = false;
    //if there any errors return it
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   // check if user with this email already exist
   try{
   
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"The user with this email id is alredy exist"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //creating a new user
    user = await User.create({
    name:req.body.name,
    password:secPass,
    email:req.body.email
   })
   const data = {
    user:{
        id:user.id
    }
   }
   
   const authToken = jwt.sign(data,jwt_secret);
//    console.log(jwtData);
   success=true;
   res.json({success,authToken});
   } catch(error){
    console.log(error.message);
    res.status(500).send("Internal server Error");
   }
})

//Route 2:
//authenticating a user using : POST "/api/auth/login" doesnt require login
router.post('/login',[
    body('email').isEmail(),
    body('password','password cannot be blank').exists()
],async (req,res) => {
    let success = false;
    //if any errors return it
    const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }

   const {email,password} = req.body;

   try{
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }   
           const authtoken = jwt.sign(data,jwt_secret);
           success=true;
           res.json({success,authtoken});

   }catch(error){
    console.log(error.message);
    res.status(500).send("Internal server Error");
   }
})


//Route 3:
// Get user details using POST: "api/auth/getuser" login required
router.post('/getuser' ,fetchuser, async (req,res) => {
    //if any errors return it
    const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }


try{
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);

}catch(error){
    console.log(error.message);
    res.status(500).send("Internal server Error");
   }


})



module.exports = router