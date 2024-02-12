const express = require("express");

const router = express.Router();

const {getConnectedClient}=require("../database/database.js");

const {ObjectId}=require("mongodb");





const getCollection = ()=>{

    const client = getConnectedClient();

    const collection = client.db("todosdb").collection("todos");

    return collection;
}








router.post('/todos',async(req,res)=>{
       
    const collection =  getCollection ();
    let {todo}=req.body

    if(!todo){
        res.status(400).json({mssg:"no data found "});
    }
 todo =  typeof todo ==="string"? todo :JSON.stringify(todo);
    const newTodo = await collection.insertOne({ todo, status:false});

    res.status(201).json({todo , status:false,_id:newTodo.insertedId});
});






router.get('/todos',async (req,res)=>{

const collection= await getCollection();
const todos = await collection.find({}).toArray();



    res.status(200).json(todos);




});





router.delete('/todos/:id',async(req,res)=>{
    const collection= await getCollection();

    const _id=new ObjectId(req.params.id);
    const deleteId=await collection.deleteOne({_id});

    res.status(200).json(deleteId);
});





router.put('/todos/:id',async(req,res)=>{

    const collection= await getCollection();

    const _id=new ObjectId(req.params.id);

    const {status}=req.body;

    if(typeof status !=="boolean"){
        res.status(400).json({mssg : " Invalid  status"});
    }

    const updatedTodo = await collection.updateOne({_id},{$set:{status:!status}});


    res.status(200).json(updatedTodo);
});





module.exports= router;
