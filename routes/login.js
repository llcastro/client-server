var express = require('express');
var login = require('../models/login');
var session = require('express-session');
var router = express.Router();

router.put('/', function(req, res, next) {
  if (!req.body.nome_usuario || !req.body.senha) {
    return res.status(400).send({mensagem: 'erro 400'});
  }

  if (req.body.nome_usuario.length > 255 || req.body.senha.length > 255) {
    return res.status(422).send({mensagem: 'erro 422'});
  }

  let params = [
    req.body.nome_usuario,
    req.body.senha
  ];

  function check_user(callback) {
    login.login(params, function(err, token) {
      if (err) {
	res.status(404).send({mensagem: 'erro: ' + err});
	callback(404, err);
      } else if (token === 1) {
	res.status(404).jsonp({mensagem: 'Usuário não encontrado'});
	callback(404, {mensagem: 'Usuário não encontrado'});
      } else {
	callback(200, token);
      }
    });
  }

  function set_session(token) {
    logged_users.push({
      user_name: req.body.nome_usuario,
      user_passwd: req.body.senha,
      user_token: token
    });
    console.log(logged_users);
  }

  return check_user(function(status, message) {
    if (status === 200) {
      set_session(message);
      res.cookie('token', message);
      res.status(200).jsonp({token: message});
    }
  });
});

module.exports = router;
