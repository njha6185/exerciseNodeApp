const express = require("express");
const mongoose = require("mongoose");
const games = require("./controller/games");
const publishers = require("./controller/publishers");

//app object
const app=express();

//Json Middleware
app.use(express.json());

//routes
app.use('/api/games',games);
app.use('/api/publishers',publishers)

//Db connection
mongoose.connect('mongodb://localhost/testNode')
.then(()=>console.log("MongoDb connected Successfully"))
.catch((ex)=>console.log("DB Not connecting, Something Went wrong!!!"));

//server creation
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});