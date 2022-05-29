const express = require("express");
const Games= require("../models/game");
const _ = require("underscore");

const route=express.Router();

//get all game
route.get("/",async (req,res)=>{
    const result=await Games.find();
    return res.status(200).send(result);
});


//get 1 game
route.get("/:title",async (req,res)=>{
    const result=await Games.find({title:req.params.title});
    return res.status(200).send(result);
});

//get publisher data from game
route.get("/publishers/:title",async (req,res)=>{
    const result=await Games.aggregate([[
        { $lookup:
           {
             from: 'publisher',
             localField: 'siret',
             foreignField: 'publisher',
             as: 'publisherdetail'
           }
         },{
             $match:{title:req.params.title}
         }
        ]]);
    return res.status(200).send(result);
});

//create a game
route.post('/', async (req,res)=>{
    let user= await Games.findOne({title:req.body.title});
    if(user) return res.status(400).send("Game already exists!!!");

    game = new Games(_.pick(req.body,['title','price','publisher','tags','releaseDate']));
    
    await game.save();

    return res.status(200).send(_.pick(game,['title','price','publisher','tags','releaseDate']));
});


//update a game
route.put('/:title',async (req,res)=>{
     const game = await Games.findOneAndUpdate(req.params.title,_.pick(req.body,['price','publisher','tags','releaseDate']),{
        new:true
    });
    if(!game) return res.status(404).send('Game Not found');
    return res.status(200).send(game);
});

//delete a game
route.delete('/:title',async (req,res)=>{

    const game= await Games.findOneAndRemove(req.params.title);
    if(!game) return res.status(404).send('Genere Not found with given GenereID');
    return res.status(200).send(game);
});


module.exports=route;