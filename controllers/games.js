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
    res.render('books/edit', {game});
  });
}

function update(req, res) {
  Game.findOneAndUpdate(
    {_id: req.params.id, user: req.user._id},
    req.body,
    {new: true},
    function(err, game) {
      if (err || !game) return res.redirect('/games');
      res.redirect(`games/${game._id}`);
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
    if (err) return render('/games/new');
    res.redirect('/games');
  });
}

function show(req, res) {
  Game.findById(req.params.id, function(err, game) {
    res.render('games/show', { game });
  });
  // res.render('games/show', {
  //   game: Game.findById(req.params.id)
  // })
}

function deleteGame(req, res) {
  Game.findOneAndDelete(
    {_id: req.params.id, user: req.user._id}, function(err) {
      res.redirect('/games');
    }
  );
    // .then(function(remove) {
    //   const game = remove.games.id(req.params.id);
    //   if (!game.user.equals(req.user._id)) return res.redirect('/')
    //   game.remove();
    //   games.save().then(function() {
    //     res.redirect('/');
    //   })
      // .catch(function(err) {
      //   return next(err);
      // });
    // });
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
  