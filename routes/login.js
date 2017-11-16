var express = require('express');
var login = require('../models/login');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

router.put('/', function(req, res, next) {
  if (!req.body.nome_usuario || !req.body.senha) {
    return res.status(400).send({ mensagem: 'erro 400' });
  }

  if (req.body.nome_usuario.length > 255 || req.body.senha.length > 255) {
    return res.status(422).send({ mensagem: 'erro 422' });
  }

  let params = [
    req.body.nome_usuario,
    req.body.senha
  ];

  function check_user(callback) {
    login.login(params, function(err, row) {
      if (err) {
	res.status(500).send({ mensagem: 'erro: ' + err });
	callback(404, err);
      } else if (row === -1) {
	res.status(404).json({ mensagem: 'Usuário não encontrado' });
	callback(404, null);
      } else {
	callback(200, row);
      }
    });
  }

  return check_user(function(status, message) {
    if (status === 200) {
      jwt.sign(message, conf.key, function(err, token) {
	if (!err) {
	  res.status(200).json({ token: token });
	} else {
	  res.status(500).send({ mensagem: 'err: ' + err });
	}
      });
    }
  });
});

module.exports = router;
