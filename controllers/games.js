const Game = require('../models/game');
const render = require('../server');

module.exports = {
  index,
  show,
  new: newGame,
  create,
  delete: deleteGame,
  edit,
  update
};

function edit(req, res) {
  Game.findOne({_id: req.params.id, user:req.user._id}, function(err, game) {
    if (err || !game) return res.redirect('/games');
    res.render('games/edit', {game, title: 'Edit Game'});
  });
}

function update(req, res) {
  Game.findOneAndUpdate(
    {_id: req.params.id, user: req.user._id},
    req.body,
    {new: true},
    function(err, game) {
      if (err || !game) return res.redirect('/games');
      res.redirect(`/games/${game._id}`);
    }
  );
}

function index(req, res) {
  Game.find({user: req.user._id}, function(err, games) {
    res.render('games/index', { title: 'All Games', games });
  });
}
  
function newGame(req, res) {
  res.render('games/new', { title: 'Add a Game' });
}

function create(req, res) {
  const game = new Game(req.body);
  game.user = req.user._id;
  game.save(function(err){
    if (err) return render('/games/new', { title: game });
    res.redirect('/games');
  });
}

function show(req, res) {
  Game.findById(req.params.id, function(err, game) {
    res.render('games/show', { game, title: 'Game Details' });
  });
}

function deleteGame(req, res) {
  Game.findOneAndDelete(
    {_id: req.params.id, user: req.user._id}, function(err) {
      res.redirect('/games');
    }
  );
}
