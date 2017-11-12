var express = require('express');
var login = require('../models/login');
var session = require('express-session');
var router = express.Router();

router.put('/', function(req, res, next) {
  const size = logged_users.length;
  
  logged_users = logged_users.filter(item => {
    return item.user_token !== req.cookies.token;
  });

  if (logged_users.length === size) {
    res.status(401).jsonp({mensagem: 'Usuário não logado'});
  } else {
    res.status(200).jsonp({mensagem: 'Usuário deslogado'});
  }
});

module.exports = router;
