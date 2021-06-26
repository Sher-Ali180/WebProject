var mongoose= require("mongoose");
const joi = require('@hapi/joi');
var GameaccScehema = mongoose.Schema({
    Name:String,
    Company:String,
    Type:String,
    Email:String,
    Icon:String,
    Price: String,
});

var GameModel = mongoose.model("Gamers",GameaccScehema);

function validateAccounts(data){
    const schema = joi.object({
        Name: joi.string().min(3).required(),
        Email: joi.string().required(),
        Type: joi.string().required(),
        Company:joi.string(),
        Icon:joi.string() .required(),
        Price:joi.string() .required()
        

    });
    return schema.validate(data,{abortEarly:false});

}
module.exports.GameAcc=GameModel;
module.exports.validate = validateAccounts;