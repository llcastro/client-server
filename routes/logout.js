var express = require('express');
var login = require('../models/login');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

router.put('/', function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
      if (err) {
	res.status(401).json({mensagem: 'Usuário não logado, ' + err});
      } else {
	res.status(200).json({mensagem: 'Usuário deslogado'});
      }
    });
  } else {
    res.status(401).json({mensagem: 'Usuário não logado'});
  }
});

module.exports = router;
