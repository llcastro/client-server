const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  get_all: function(callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select cliente_id as id_cliente, cliente_nome as nome_cliente, cliente_cpf as cpf from cliente', function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  insert: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('insert into cliente(cliente_cpf, cliente_nome) values(?, ?)', params, function(err) {
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
  delete: function(id, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('delete from cliente where cliente_id = ?', [id], function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  get_by_cpf: function(cpf, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select cliente_cpf from cliente where cliente_cpf = ?', [cpf], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  get_by_id: function(id, callback) {
    let db = new sqlite3.Database(db_path);
    db.all('select cliente_id, cliente_nome, cliente_cpf from cliente where cliente_id = ?', [id], function(err, row) {
      if (err) {
	return callback(err);
      }
      return callback(null, row[0]);
    });

    db.close();
  }
};
