var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.redirect("/");
  } else {
    req.session.users = database.users.data
    console.log(req.body);
    console.log(req.session.users);
    console.log(req.session.users['ana']);
    res.render('admin', { title: 'Admin Panel', logged_user: req.session.user, role: req.session.role, users: req.session.users});
  }
});

router.post('/deleteUser', function(req, res, next){
    const user = req.body.user;
    console.log(database.users.data[user]);
    database.users.data[user] = '';
    console.log(database.users.data[user]);
    res.render('admin', { title: 'Admin Panel', logged_user: req.session.user, role: req.session.role, users: req.session.users});
});

router.get('/obtenerArray', function(req, res, next) {
  res.json({users: req.session.users});
});
module.exports = router;
