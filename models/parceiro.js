const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  list: function(callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select parceiro_id as id, parceiro_cnpj as cnpj, parceiro_nome_fantasia as nome_fantasia, parceiro_razao_social as razao_social from parceiro', function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  insert: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('insert into parceiro(parceiro_cnpj, parceiro_nome_fantasia, parceiro_razao_social) values (?, ?, ?)', params, function(err) {
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

    db.run('update cliente set cliente_nome = ?, cliente_cpf = ? where cliente_id = ?', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  delete: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('delete from cliente where cliente_id = ?', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  get_by_cnpj: function(cnpj, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select parceiro_id as id, parceiro_cnpj as cnpj, parceiro_nome_fantasia as nome_fantasia, parceiro_razao_social as razao_social from parceiro where parceiro_cnpj = ?', [cnpj], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  }
};
