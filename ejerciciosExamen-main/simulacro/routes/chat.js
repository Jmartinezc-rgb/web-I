const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res) {
  const cookies = database.user.data[req.session.user.username].cookies;
  res.render('chat', {user: req.session.user, cookies: cookies});
});

module.exports = router;