require("dotenv").config();
const express=require('express');
const router = require("./route/route.js");
const  {conncetToMongoDb }=require("./database/database.js");
const path=require("path");

const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"biuld/index.html"));
})


app.use("/api",router);


const port=process.env.PORT ||5000;



async function startServer(){
    await conncetToMongoDb();
    app.listen(port,()=>{
        console.log(` server is listening on port : ${port}`);
    })
}


startServer();
