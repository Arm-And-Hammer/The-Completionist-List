const Game = require('../models/game');

module.exports = {
  index,
  // show,
  new: newGame,
  // create
};

function index(req, res) {
  Game.find({}, function(err, games) {
    res.render('games/index', { title: 'All Games', games });
  });
}
  
function newGame(req, res) {
  res.render('games/new', { title: 'Add a Game' });
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
  