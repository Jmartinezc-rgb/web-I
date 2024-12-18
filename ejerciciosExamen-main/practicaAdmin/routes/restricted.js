var express = require('express');
var router = express.Router();
const database = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user.username);
  console.log(database.users.data[req.session.user.username].role);
  req.session.role = database.users.data[req.session.user.username].role;
  res.render('restricted', { title: 'Restricted', logged_user: req.session.user, role: req.session.role});
});

module.exports = router;
