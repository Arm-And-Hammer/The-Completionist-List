
const { NotExtended } = require('http-errors');
const Game = require('../models/game');
const render = require('../server');

module.exports = {
  index,
  show,
  new: newGame,
  create,
  delete: deleteGame
};

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
    if (err) return render('/games/new');
    res.redirect('/games');
  });
}

function show(req, res) {
  // const game = Game.findById(req.params.id)
  // game.
  res.render('games/show', {
    game: Game.findById(req.params.id)
  })
}

function deleteGame(req, res, next) {
  Game.findOne({'games._id' : req.params.id})
    .then(function(remove) {
      const game = remove.games.id(req.params.id);
      if (!game.user.equals(req.user._id)) return res.redirect('/')
      game.remove();
      games.save().then(function() {
        res.redirect('/');
      })
      // .catch(function(err) {
      //   return next(err);
      // });
    });
}

// function create(req, res) {
//   // convert nowShowing's checkbox of nothing or "on" to boolean
//   req.body.nowShowing = !!req.body.nowShowing;
//   // ensure empty inputs are removed so that model's default values will work
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key];
//   }
//   const game = new Game(req.body);
//   game.save(function(err) {
//     if (err) return res.redirect('/games/new');
//     res.redirect(`/games/${game._id}`);
//   });
// }
  