const Game = require('../models/game');

module.exports = {
    create,
    delete: deleteNote
}

function create(req, res) {
    Game.findById(req.perams.id, function(err, game) {
        req.body.user = req.user._id;
        
        game.notes.push(req.body);
        game.save(function(err) {
            res.redirect(`/games/${game._id}`);
        });
    });
}

function deleteNote(req, res, next) {
    Game.findOne({'notes._id' : req.perams.id})
     .then(function(game) {
         const note = game.notes.id(req.perams.id);
         if (!notes.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
         note.remove();
         game.save().then(function() {
             res.redirect(`game/${game._id}`);
         });
     });
}