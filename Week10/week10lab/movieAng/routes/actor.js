const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function(err, actor) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actor);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOne({ _id: actorID })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOneAndUpdate({ _id: actorID }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOneAndDelete({ _id: actorID}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.id);

        Actor.findOne({ _id: actorID }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: movieID }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteActorAndMovies: function(req, res){
        Actor.findByIdAndDelete({_id: req.params.actorId}, function(err, actor){
            if(err) return res.status(404).json(err);
            for(let i =0; i < actor.movies.length; i++){
                Movie.findByIdAndDelete({_id: actor.movies[i]}, function(err, movie){
                    if(err) return res.status(400).json(err);
                });
            }
            res.json(actor);
        });
    },
    removeMovie: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);

        Movie.findOne({_id: movieID }, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: actorID }, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },
    updateAge: function(req, res){
        Actor.find({'bYear':{$lt:1969}}, function (err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            else{
                console.log(actor[0].bYear);
                for(let i = 0; i < actor.length; i++){
                    Actor.findByIdAndUpdate({_id:actor[i]._id},{$set:{bYear:actor[i].bYear -4}}, function(err){
                        if(err) return res.status(400).json(err);
                        if(!actor) return res.status(404).json();
                    
                    })
                }
            }
            console.log(actor);
            res.json(actor);
        })
    }
};

//Extra Task: Add a new endpoint that:
//Increment the age of all actors who are older than 50 by 4 years