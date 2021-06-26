var mongoose= require("mongoose");
var bcrypt = require("bcrypt");
const joi = require('@hapi/joi');
var userSchema = mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:String,
    Password:String,
    role:{
        type: String,
        default:"user"

    }
});
userSchema.methods.generateHashedPassword = async function(){
    let salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password,salt)
}
var users = mongoose.model("users",userSchema);
function validateUsers(data){
    const schema = joi.object({
        Name: joi.string().min(3).required(),
        Email: joi.string().email().required(),
        FirstName:joi.string(),
        LastName:joi.string(),
        Password: joi.string().required(),
        

    });
    return schema.validate(data,{abortEarly:false});

}
function validateUsersLog(data){
    const schema = joi.object({
        Email: joi.string().email().required(),
        Password: joi.string().required(),
        

    });
    return schema.validate(data,{abortEarly:false});

}
module.exports.users=users;
module.exports.validate = validateUsers;
module.exports.validateUsersLog = validateUsersLog;