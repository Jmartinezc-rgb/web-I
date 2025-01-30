const express = require('express');
const router = express.Router();
const config = require('../config');
const users = require('../database/models/user.model');
const { Cookie } = require('express-session');

router.get('/', function(req, res) {
  const scores = users.getHighScores(); // Obtener puntuaciones
  const cookie = req.session.AcceptCookie || false; // Comprobar si las cookies están aceptadas

  res.render('restricted', {
      user: req.session.user,
      title: config.nombreTienda,
      scores: scores,
      cookie: cookie // Pasamos la variable cookie a la vista
  });
});


module.exports = router;
