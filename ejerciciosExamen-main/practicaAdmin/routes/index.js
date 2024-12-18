var express = require('express');
var router = express.Router();
let role = ""
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    role = req.session.role;
  }
  res.render('index', { title: 'My web', logged_user: req.session.user, role: role});
});

module.exports = router;
