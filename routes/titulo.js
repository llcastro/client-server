var express = require('express');
var titulo = require('../models/titulo');
var cliente = require('../models/cliente');
var parceiro = require('../models/parceiro');
var titulo_tipo = require('../models/titulo_tipo');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }
  
  if (!req.body.id_cliente || !req.body.valor || !req.body.data_emissao || !req.body.situacao || !req.body.descricao) {
    return res.status(400).json({ mensagem: 'erro 400' });
  }

  if (req.body.valor.length > 20 || req.body.descricao.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422' });
  }

  function check_client_id(callback) {
    cliente.get_by_id(req.body.id_cliente, function(err, row) {
      if (err) {
	res.status(500).json({ mensagem: err });
	callback(500, err);
      } else if (row) {
	callback(200, row);
      } else {
	res.status(422).json({ mensagem: 'Cliente não existe' });
	callback(422, null);
      }
    });
  }

  function titulo_insert(id_parceiro, callback) {
    let params = [
      req.body.valor,
      req.body.data_pagamento,
      req.body.data_emissao,
      req.body.situacao,
      req.body.id_cliente,
      req.body.descricao,
      id_parceiro
    ];

    titulo.insert(params, function(err, id) {
      if (err) {
	res.status(500).json({ mensagem: err });
	callback(500, err);
      } else {
	callback(200, id);
      }
    });
  }

  function insert(id_parceiro) {
    check_client_id(function(status, message) {
      console.log(status, message);
      if (status === 200) {
	console.log(id_parceiro);
	titulo_insert(id_parceiro, function(status, id_titulo) {
	  if (status === 200) {
	    res.status(200).json({ mensagem: 'titulo inserido com sucesso!, id_titulo: ' + id_titulo });
	  }
	});
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      insert(decode.usuario_parceiro_id);
    }
  });
});

router.put('/:id', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  if (!req.body.valor || !req.body.descricao || !req.body.data_emissao || !req.body.situacao || !req.params.id) {
    return res.status(400).json({ mensagem: 'erro 400' });
  }

  if (req.body.valor.length > 20 || req.body.descricao.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422' });
  }

  function update_titulo(id_parceiro) {
    let params = [
      req.body.valor,
      req.body.data_pagamento,
      req.body.descricao,
      req.body.data_emissao,
      req.body.situacao,
      req.params.id
    ];
    titulo.update(params, function(err, changes) {
      console.log(err);
      if (err) {
	return res.status(500).json({ mensagem: err });
      } else if(changes) {
	return res.status(200).json({ mensagem: 'Titulo atualizado com sucesso' });
      } else {
	return res.status(404).json({ mensagem: 'erro 404' });
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      update_titulo(decode.usuario_parceiro_id);
    }
  });
  
});

router.delete('/:id', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  function delete_titulo(decode) {
    titulo.delete(req.params.id, function(err, changes) {
      if (err) {
	res.status(500).json({ mensagem: 'err ' + err });
      } else {
	res.status(200).json({ mensagem: 'Titulo removido com sucesso' });
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      delete_titulo(decode);
    }
  });
});

router.get('/', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      titulo.get_all(function(err, rows) {
	if (err) {
	  res.status(500).json({ mensagem: err });
	} else {
	  res.status(200).json(rows);
	}
      });
    }
  });
});

module.exports = router;
