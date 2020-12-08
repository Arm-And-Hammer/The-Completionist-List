const express = require('express');
const router = express.Router();
const gamesCtrl = require('../controllers/games');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, gamesCtrl.index);
router.get('/new', gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/', isLoggedIn, gamesCtrl.create);
router.delete('/:id', isLoggedIn, gamesCtrl.delete);
router.get('/:id/edit', isLoggedIn, gamesCtrl.edit);
router.put('/:id', isLoggedIn, gamesCtrl.update);

module.exports = router;
