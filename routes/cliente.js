var express = require('express');
var cliente = require('../models/cliente');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }
  
  if (!req.body.nome || !req.body.cpf) {
    return res.status(400).json({ mensagem: 'erro 400' });
  }

  if (req.body.cpf.length > 15 || req.body.nome.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422' });
  }

  function check_cpf(callback) {
    cliente.get_by_cpf(req.body.cpf, function(err, row) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else if (row.length) {
	res.status(422).json({ mensagem: 'cpf existente' });
	callback(422, null);
      } else {
	callback(200, 'ok');
      }
    });
  }

  function cliente_insert(callback) {
    let params = [
      req.body.cpf,
      req.body.nome
    ];

    cliente.insert(params, function(err, id) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else {
	callback(200, id);
      }
    });
  }

  function insert() {
    check_cpf(function(status, message) {
      console.log(status, message);
      if (status === 200) {
	cliente_insert(function(status, id_cliente) {
	  console.log(status, 'id_cliente: ' + id_cliente);
	  if (status === 200) {
	    res.status(200).json({ mensagem: 'cliente inserido com sucesso!, id_cliente:' + id_cliente });
	  }
	});
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      insert();
    }
  });
});

router.put('/:id', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  if (!req.body.nome || !req.body.cpf || !req.params.id) {
    return res.status(400).json({ mensagem: 'erro 400' });
  }

  if (req.body.cpf.length > 15 || req.body.nome.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422' });
  }

  function update_client() {
    let params = [
      req.body.nome,
      req.body.cpf,
      req.params.id
    ];
    cliente.update(params, function(err, changes) {
      if (err) {
	return res.status(500).json({ mensagem: err });
      } else if(changes) {
	return res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
      } else {
	return res.status(404).json({ mensagem: 'erro 404' });
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      update_client();
    }
  });
  
});

router.delete('/:id', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  function delete_client(decode) {
    cliente.delete(req.params.id, function(err, changes) {
      if (err) {
	res.status(500).json({ mensagem: 'err ' + err });
      } else {
	res.status(200).json({ mensagem: 'Cliente removido com sucesso' });
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      delete_client(decode);
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
      cliente.get_all(function(err, rows) {
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
