require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const router = require("./routes/routes.cjs")
const con = require("./modules/dbConn.cjs");
app.get("/",(req,res)=>{
    res.send("Welcome to backend server")
});
app.use(cors());
app.use(express.json())
app.use("/api",router)
con()
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})