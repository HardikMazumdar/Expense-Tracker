const mongoose = require("mongoose");
const express = require("express");
const router = express.Router()
const {userModel,incomeModel, expenseModel} = require("../modules/User.cjs");

router.post("/SignUp", async function(req,res){
    try{
    const {name,email,password} = req.body;
    const newUser = new userModel({name,email,password});
    await newUser.save();
    res.status(201).json(newUser);
    }catch(err)
    {
        if (err.code === 11000){
        return res.status(400).json({message:`Email already exists`});
        }
        else{
            res.status(400).json({message:err.message})
        }
    }
})
router.post("/login", async function (req,res){
    try{
    const {name,email,password} = req.body;
    const user = await userModel.findOne({name,email,password});
   if (!user)
   {
        res.status(401).send("User not found");
   }
    else{
    res.status(200).json(user);}
    }catch(err){
        res.status(500).json({message:err.message});
        
    }
})
router.get("/income",async function(req,res){
    try{
        const listOfIncomes = await incomeModel.find();
        res.status(200).json(listOfIncomes);
    }catch(err)
    {
        res.status(500).json({message:err.message});
    }
});
router.post("/income",async function(req,res){
    try{
    const {date,income,incomeSource} = req.body;
     const newIncome = new incomeModel({date,income,incomeSource});
     await newIncome.save();
     res.status(200).json(newIncome);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})
router.delete("/income/:id",async function(req,res){
    try{
    const result = await incomeModel.deleteOne({_id:req.params.id});
    if (result.deletedCount === 0)
    {
        return res.status(401).send("Not found");
    }
    return res.status(200).send("Data Deleted");
}
    catch(err){
        res.status(404).json({message:err.message});
    }
})
router.get("/expense",async function(req,res){
    try{
    const listOfExpenses = await expenseModel.find();
    res.status(200).json(listOfExpenses);
    }catch(err){
        res.status(500).json({message:err.message});
    }

});
router.post("/expense",async function (req,res){
    try{
        const {date,expense,on}=req.body;
        const newExpense = new expenseModel({date,expense,on});
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})
router.delete("/expense/:id",async function(req,res){
    try{
    const result = await expenseModel.deleteOne({_id:req.params.id});
    if (result.deletedCount === 0)
    {
        return res.status(401).send("Not found");
    }
    return res.status(200).send("Data deleted");
}catch(err){
    res.status(400).json({message:err.message});
}
})
module.exports = router;