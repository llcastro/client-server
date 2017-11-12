var express = require('express');
var parceiro = require('../models/parceiro');
var usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (!req.body.cnpj || !req.body.nome_fantasia || !req.body.razao_social || !req.body.email || !req.body.nome_usuario || !req.body.senha) {
    return res.status(400).send({erro: 400});
  }

  if (req.body.cnpj.length > 18 || req.body.nome_fantasia.length > 255 || req.body.razao_social.length > 255 || req.body.email.length > 255 || req.body.nome_usuario.length > 255 || req.body.senha.length > 255) {
    return res.status(422).send({erro: 422});
  }

  function check_cnpj(callback) {
    parceiro.get_by_cnpj(req.body.cnpj, function(err, row) {
      if (err) {
	res.status(404).send(err);
	callback(404, err);
      } else if (row.length) {
	res.status(422).jsonp({ message: 'cnpj existente' });
	callback(422, { message: 'cnpj existente' });
      } else {
	callback(200, 'ok');
      }
    });
  }

  function check_email(callback) {
    usuario.get_by_email(req.body.email, function(err, row) {
      if (err) {
	res.status(404).send(err);
	callback(404, err);
      } else if (row.length) {
	res.status(422).jsonp({ message: 'e-mail já cadastrado' });
	callback(422, { message: 'e-mail já cadastrado' });
      } else {
	callback(200, 'ok');
      }
    });
  }

  function parceiro_insert(callback) {
    let params = [
      req.body.cnpj,
      req.body.nome_fantasia,
      req.body.razao_social
    ];

    parceiro.insert(params, function(err, id) {
      if (err) {
	res.status(404).send(err);
	callback(404, err);
      } else {
	callback(200, id);
      }
    });
  }

  function usuario_insert(id_parceiro, callback) {
    let params = [
      req.body.nome_usuario,
      req.body.email,
      req.body.senha,
      id_parceiro
    ];

    usuario.insert(params, function(err, id) {
      if (err) {
	res.status(404).send(err);
	callback(404, err);
      } else {
	callback(200, id);
      }
    });
  }

  check_cnpj(function(status, message) {
    console.log(status, message);
    if (status === 200) {
      check_email(function(status, message) {
	console.log(status, message);
	if (status === 200) {
	  parceiro_insert(function(status, id_parceiro) {
	    console.log(status, 'id_parceiro: ' + id_parceiro);
	    if (status === 200) {
	      usuario_insert(id_parceiro, function(status, id_usuario) {
		console.log(status, 'id_usuario: ' + id_usuario);
		if (status === 200) {
		  res.status(200).jsonp({ message: 'parceiro inserido com sucesso!, id_parceiro:' + id_parceiro + ', id_usuario:' + id_usuario });
		}
	      });
	    }
	  });
	}
      });
    }
  });


});

router.put('/', function(req, res, next) {
  let params = [
    req.body.nome,
    req.body.cpf,
    req.body.id
  ];

  parceiro.parceiro_update(params, function(err, changes) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).jsonp(changes);
    }
  });
});

router.delete('/', function(req, res, next) {
  let params = [
    req.body.id
  ];

  parceiro.parceiro_delete(params, function(err, changes) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).jsonp(changes);
    }
  });
});

router.get('/', function(req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).send({mensagem: 'Usuário não logado!'});
  }
  
  for (var i = 0; i < logged_users.length; i++) {
    if (logged_users[i].user_token === req.cookies.token) {
      break;
    }
  }

  if (i === logged_users.length) {
    return res.status(404).send({mensagem: 'Usuário não encontrado no sistema'});
  }
  
  return parceiro.list(function(err, rows) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).jsonp(rows);
    }
  });
});

module.exports = router;
