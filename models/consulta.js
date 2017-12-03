const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  get_titles_by_id_client: function(id_client, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select titulo_id as id_titulo, titulo_descricao as descricao, titulo_situacao as situacao from titulo where titulo_cliente_id = ?', [id_client], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  get_titles_by_id_client_partner: function(id_client, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select titulo_id as id_titulo, titulo_parceiro_id as id_parceiro, titulo_cliente_id as id_cliente, titulo_situacao as situacao, titulo_descricao as descricao, titulo_valor as valor, titulo_data_pagamento as data_pagamento, titulo_data_emissao as data_emissao from titulo where titulo_cliente_id = ?', [id_client], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  get_id_client_by_cpf: function(cpf, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select cliente_id as id_cliente from cliente where cliente_cpf = ?', [cpf], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  }
};
