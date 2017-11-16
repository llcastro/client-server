var express = require('express');
var parceiro = require('../models/parceiro');
var usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var conf = require('../conf.json');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (!req.body.cnpj || !req.body.nome_fantasia || !req.body.razao_social || !req.body.email || !req.body.nome_usuario || !req.body.senha) {
    return res.status(400).json({ mensagem: 'erro 400' });
  }

  if (req.body.cnpj.length > 18 || req.body.nome_fantasia.length > 255 || req.body.razao_social.length > 255 || req.body.email.length > 255 || req.body.nome_usuario.length > 255 || req.body.senha.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422' });
  }

  function check_cnpj(callback) {
    parceiro.get_by_cnpj(req.body.cnpj, function(err, row) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else if (row.length) {
	res.status(422).json({ mensagem: 'cnpj existente' });
	callback(422, null);
      } else {
	callback(200, 'ok');
      }
    });
  }

  function check_email(callback) {
    usuario.get_by_email(req.body.email, function(err, row) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else if (row.length) {
	res.status(422).json({ mensagem: 'e-mail já cadastrado' });
	callback(422, null);
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
	res.status(404).json({ mensagem: err });
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
	res.status(404).json({ mensagem: err });
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
		  res.status(200).json({ mensagem: 'parceiro inserido com sucesso!, id_parceiro:' + id_parceiro + ', id_usuario:' + id_usuario });
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
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  if (!req.body.nome_fantasia || !req.body.razao_social || !req.body.email || !req.body.senha) {
    return res.status(400).json({ mensagem: 'erro 400'});
  }

  if (req.body.nome_fantasia.length > 255 || req.body.razao_social.length > 255 || req.body.email.length > 255 || req.body.senha.length > 255) {
    return res.status(422).json({ mensagem: 'erro 422'});
  }

  function parceiro_update(params, callback) {
    parceiro.update(params, function(err, changes) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else {
	callback(200, changes);
      }
    });
  }

  function usuario_update(params, callback) {
    usuario.update(params, function(err, changes) {
      if (err) {
	res.status(404).json({ mensagem: err });
	callback(404, err);
      } else {
	callback(200, changes);
      }
    });
  }

  function update_both(decode) {
    let params = [
      req.body.nome_fantasia,
      req.body.razao_social,
      decode.usuario_parceiro_id
    ];
    parceiro_update(params, function(status, changes) {
      if (status === 200) {
	params = [
	  req.body.email,
	  req.body.senha,
	  decode.usuario_id
	];
	usuario_update(params, function(status, changes) {
	  if (status === 200) {
	    res.status(200).json({ mensagem: 'Parceiro atualizado com sucesso'});
	  }
	});
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      update_both(decode);
    }
  });
  
});

router.delete('/', function(req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não logado!' });
  }

  function delete_user(decode) {
    usuario.delete(decode.usuario_id, function(err, changes) {
      if (err) {
	res.status(500).json({ mensagem: 'err ' + err });
      } else {
	res.status(200).json({ mensagem: 'Usuário desativado com sucesso' });
      }
    });
  }

  return jwt.verify(req.headers.authorization, conf.key, function(err, decode) {
    if (err) {
      res.status(401).json({ mensagem: 'Usuário não logado, ' + err });
    } else {
      delete_user(decode);
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
      parceiro.get_by_id([decode.usuario_id, decode.usuario_parceiro_id], function(err, row) {
	if (err) {
	  res.status(500).json({ mensagem: err });
	} else {
	  res.status(200).json(row);
	}
      });
    }
  });
});

module.exports = router;
