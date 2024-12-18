const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  let cookies = false;
  if(database.user.data[req.session.user.username].cookies){
    cookies = database.user.data[req.session.user.username].cookies;
  }
  res.render('tienda', {user:req.session.user, cookies: cookies});
});

module.exports = router;
