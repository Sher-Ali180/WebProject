const jwt = require("jsonwebtoken")
const config = require("config");
const {users} = require("../models/usersModel")
async function auth(req,res,next){
    let token = req.header("x-auth-token");
    if (!token) return res.status(400).send("Token isnt provided");
    try{
        let user = jwt.verify(token,config.get("jwtpk"));
        req.user = await users.findById(user._id)
}       
catch(err){
    return res.status(401).send("Token is not valid")}

    next();
    

}
module.exports = auth;
