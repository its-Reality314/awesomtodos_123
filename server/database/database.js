require("dotenv").config();

const {MongoClient,ServerApiVersion} = require("mongodb");

const uri = process.env.MONGO_URI || "http:localhost/24578/";



const options ={
    serverApi:{
        version :ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
        
    }

};

let client;

const conncetToMongoDb= async()=>{
    if(!client){
        try{
            client=await MongoClient.connect(uri,options);
console.log("MongoDb has been connected");
        }
        catch(err){
            console.log(err);
        }
    }
return client;
};

const getConnectedClient = ()=>client;
module.exports={conncetToMongoDb,getConnectedClient};