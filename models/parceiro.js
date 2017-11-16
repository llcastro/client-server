const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  get_by_id: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select p.parceiro_cnpj as cnpj, p.parceiro_nome_fantasia as nome_fantasia, p.parceiro_razao_social as razao_social, u.usuario_nome as nome_usuario, u.usuario_email as email from parceiro p inner join usuario u on p.parceiro_id = u.usuario_parceiro_id where u.usuario_id = ? and u.usuario_parceiro_id = ? and u.usuario_status = 1', params, function(err, row) {
      if (err) {
	return callback(err);
      }
      return callback(null, row[0]);
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

    db.run('update parceiro set parceiro_nome_fantasia = ?, parceiro_razao_social = ? where parceiro_id = ?', params, function(err) {
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

    db.run('', [id], function(err) {
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
