var express = require('express');
var consulta = require('../models/consulta');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

function validate_cpf(cpf) {
  if (!cpf) {
    return false;
  } else if (cpf.length > 14 || cpf.length < 11) {
    return false;
  } else {
    return true;
  }
}

router.get('/cliente/:cpf', function(req, res, next) {
  if (validate_cpf(req.params.cpf)) {
    consulta.get_id_client_by_cpf(req.params.cpf, function(err, row) {
      if (err) {
	res.status(500).json({ mensagem: err });
      } else {
	consulta.get_titles_by_id_client(row[0].id_cliente, function(err, rows) {
	  if (err) {
	    res.status(500).json({ mensagem: err });
	  } else {
	    res.status(200).json(rows);
	  }
	});
      }
    });
  } else {
    res.status(422).json({ mensagem: 'CPF inválido'});
  }
  
});

router.get('/parceiro/:cpf', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      if (validate_cpf(req.params.cpf)) {
	consulta.get_id_client_by_cpf(req.params.cpf, function(err, row) {
	  if (err) {
	    res.status(500).json({ mensagem: err });
	  } else {
	    consulta.get_titles_by_id_client_partner(row[0].id_cliente, function(err, rows) {
	      if (err) {
		res.status(500).json({ mensagem: err });
	      } else {
		res.status(200).json(rows);
	      }
	    });
	  }
	});
      } else {
	res.status(422).json({ mensagem: 'CPF inválido'});
      }
    }
  });
});

module.exports = router;
