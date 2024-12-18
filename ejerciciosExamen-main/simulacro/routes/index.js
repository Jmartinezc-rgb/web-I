const express = require('express');
const router = express.Router();
const users = require('../database/models/user.model');
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(users);
  let cookies = false;
  if(req.session.user){
    cookies = database.user.data[req.session.user.username].cookies;
  }
  res.render('index', {user:req.session.user, cookies: cookies});
});

module.exports = router;
