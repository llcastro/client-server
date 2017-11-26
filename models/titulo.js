const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  get_all: function(callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select titulo_id as id_titulo, titulo_valor as valor, titulo_data_pagamento as data_pagamento, titulo_data_emissao as data_emissao, titulo_situacao as situacao, titulo_tipo_id as id_titulo_tipo, titulo_cliente_id as id_cliente, titulo_identificador as identificador from titulo', function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  insert: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('insert into titulo(titulo_valor, titulo_data_pagamento, titulo_identificador, titulo_data_emissao, titulo_situacao, titulo_tipo_id, titulo_cliente_id, titulo_parceiro_id) values(?, ?, ?, ?, ?, ?, ?, ?)', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.lastID);
      }
    });

    db.close();
  },
  update: function(params, callback) {
    let db = new sqlite3.Database(db_path);
    console.log(params);

    db.run('update titulo set titulo_valor = ?, titulo_data_pagamento = ?, titulo_identificador = ?, titulo_data_emissao = ?, titulo_situacao = ?, titulo_tipo_id = ?, titulo_cliente_id = ?, titulo_parceiro_id = ? where titulo_id = ?', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  delete: function(id, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('delete from titulo where titulo_id = ?', [id], function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  }
};
