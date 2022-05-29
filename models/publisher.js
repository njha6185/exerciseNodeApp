const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
    name:{type:String, required:true, trim: true},
    siret:{type:Number, required:true},
    phone: {type:String, required:true,trim: true}
});

const Publishers= mongoose.model('Publishers',PublisherSchema);

module.exports=Publishers;