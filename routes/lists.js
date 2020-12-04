const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists');
const isLoggedIn = require('../config/auth');

router.get('/', listsCtrl.index);
router.get('/new', isLoggedIn, listsCtrl.new);
router.get('/:id', listsCtrl.show);
router.post('/', isLoggedIn, listsCtrl.create);

module.exports = router;
