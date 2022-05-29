const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    title:{type:String, required:true, trim: true, unique:true},
    price:{type:Number, required:true},
    publisher: {type:String, required:true,trim: true},
    tags:[],
    releaseDate:{type:Date,required:true}
});

const Games= mongoose.model('Games',GameSchema);

module.exports=Games;