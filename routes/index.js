var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Completionist List' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/movies',
    failureMessage: '/movies'
  }
));

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/movies');
});



module.exports = router;
