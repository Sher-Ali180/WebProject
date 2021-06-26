const express = require("express");
const validateUsers = require("../../Middleware/validateUsers");
let router = express.Router();
var {users, validate} = require("../../models/usersModel")
var bcrypt = require("bcrypt");
var _ = require("lodash")
const jwt = require("jsonwebtoken")
const config=require("config")
//get users
router.get("/", async(req,res) =>{
    let user = await users.find();
    return res.send(user)
});


//add rec

router.post("/register", async(req,res) =>{
    let user = await users.findOne({Email: req.body.Email});
    if (user) return res.status(400).send("Email already exists")
    
    user = new users();
    user.FirstName= req.body.FirstName;
    user.LastName= req.body.LastName;
    user.Password= req.body.Password;
    user.Email= req.body.Email;
   await user.generateHashedPassword();
    await user.save();
    
    return res.send(_.pick(user,["Name","Email"]));
    
});
router.post("/login", async(req,res) =>{
    let user = await users.findOne({Email: req.body.Email});
    if (!user) return res.status(400).send("User is not registered")
    let isValid = await bcrypt.compare(req.body.Password,user.Password)
    if (!isValid) return res.status(401).send("invalid password")
    let token = jwt.sign({ _id:user._id, name:user.Name},config.get("jwtpk"));
    res.send(token)
    console.log (token)
});   
module.exports = router;