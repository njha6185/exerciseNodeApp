const express = require("express");
const Publishers= require("../models/publisher");

const route=express.Router();

//get all publisher
route.get("/",async (req,res)=>{
    //const result=await Publishers.find();
    return res.status(200).send("result");
});

module.exports=route;