var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Completionist List' });
});

router.get('/', function(req, res, next) {
  res.redirect('/games');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/games',
    failureMessage: '/games'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/games');
});



module.exports = router;
