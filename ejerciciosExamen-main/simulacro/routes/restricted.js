const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res) {
  console.log(database.user.data);
  const cookies = database.user.data[req.session.user.username].cookies;
  console.log('mis cookies: ' + cookies)
  res.render('restricted', {user: req.session.user, cookies: cookies});
});

module.exports = router;
