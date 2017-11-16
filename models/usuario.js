const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  update: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('update usuario set usuario_email = ?, usuario_senha = ? where usuario_id = ?', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  list: function(callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select usuario_id as id, usuario_nome as nome_usuario, usuario_email as email, usuario_senha as senha, usuario_status as status, usuario_parceiro_id from usuario', function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  insert: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('insert into usuario (usuario_nome, usuario_email, usuario_senha, usuario_status, usuario_parceiro_id) values (?, ?, ?, 1, ?)', params, function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.lastID);
      }
    });

    db.close();
  },
  delete: function(id, callback) {
    // just inactivate user
    let db = new sqlite3.Database(db_path);

    db.run('update usuario set usuario_status = 0 where usuario_id = ?', [id], function(err) {
      if (err) {
	return callback(err);
      } else {
	return callback(null, this.changes);
      }
    });

    db.close();
  },
  get_by_email: function(email, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select usuario_id as id, usuario_nome as nome_usuario, usuario_email as email, usuario_senha as senha, usuario_status as status, usuario_parceiro_id from usuario where usuario_email = ?', [email], function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  }
};
