const { text } = require("body-parser");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
})
const incomeSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true,
        unique: true
    },
    income:{
        type:Number,
        required:true,
    },
    incomeSource:{
        type: String,
        required: true,
    } 
});
const expenseSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true,
        unique:true
    },
    expense:{
        type: Number,
        required: true,
    },
    on:{
        type: String,
        required: true,
    }
})
const userModel = mongoose.model("Users",userSchema)
const incomeModel = mongoose.model("Income",incomeSchema);
const expenseModel = mongoose.model("Expense",expenseSchema);
module.exports = {userModel,incomeModel, expenseModel};