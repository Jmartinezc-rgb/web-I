const express = require('express');
const router = express.Router();
const database = require('../database');
const config = require('../config');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user, title:config.nombreTienda, cookie: req.session.AcceptCookie});
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){
    req.session.user = user;
    req.session.message = "¡Login correcto!"
    req.session.AcceptCookie = true
    res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});

module.exports = router;
