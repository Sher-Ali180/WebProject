const { validate } = require("../models/usersModel")
function validateUsers(req,res,next){
    let { error } = validate(req.body);
    if(error) return res.status(400).send(error.message);
    next();
}
module.exports = validateUsers;
