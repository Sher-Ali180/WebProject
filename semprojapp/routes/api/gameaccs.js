const express = require("express");
let router = express.Router();
const validateAcc = require("../../Middleware/validateAcc")
const auth = require("../../Middleware/auth")
var {GameAcc} = require("../../models/gameaccountsmodel")
const admin = require("../../Middleware/admin")

//get all recs
router.get("/",auth,async(req,res) =>{
    console.log(req.user);
    let acc = await GameAcc.find();
    return res.send(acc)
});
//add rec
router.post("/", validateAcc,auth,admin, async(req,res) =>{
    let acc = new GameAcc();
    acc.Name= req.body.Name;
    acc.Company= req.body.Company;
    acc.Type= req.body.Type;
    acc.Email= req.body.Email;
    acc.Icon = req.body.Icon;
    acc.Price= req.body.Price;
    await acc.save();
    
    return res.send(acc);
    
});

//getbyid
router.get("/:id",auth, async(req,res) =>{
    try {
    let acc = await GameAcc.findById(req.params.id);
    if(!acc)
    return res.status(400).send("Invalid Account")
    return res.send(acc);
}catch(err){
    res.status(400).send("Invalid ID");
}})
//update record
router.put("/:id",auth,admin, async(req,res) =>{
    let acc = await GameAcc.findById(req.params.id);
    
    acc.Name= req.body.Name;
    acc.Company= req.body.Company;
    acc.Type= req.body.Type;
    acc.Email= req.body.Email;
    acc.Icon = req.body.Icon;
    acc.Price= req.body.Price;
    await acc.save();
    return res.send(acc);
});
//delete a record
router.delete("/:id", auth,admin, async(req,res) =>{
    try {
    let acc = await GameAcc.findByIdAndDelete(req.params.id);
    if(!acc)
    return res.status(400).send("Invalid Account")
    return res.send(acc);
}catch(err){
    res.status(400).send("Invalid ID");
}})   



module.exports = router;
