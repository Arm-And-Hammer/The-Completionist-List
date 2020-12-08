const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const isLoggedIn = require('../config/auth');

router.post('/gamess/:id/notes', isLoggedIn, notesCtrl.create);
router.delete('/notes/:id', isLoggedIn, notesCtrl.delete);

module.exports = router;