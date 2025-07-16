require("dotenv").config({path:"../.env"});
const mongoose = require("mongoose")
const uri = process.env.MONGODB_URL;
function Conn()
{
    try{
        const connect = mongoose.connect(uri)
        console.log("connected")
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports = Conn;