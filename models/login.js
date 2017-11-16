const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  login: function(params, callback) {
    this.check_user(params, function(err, row) {
      if (err) {
	return callback(err);
      } else if(!row.length) {
	return callback(null, -1); // user doesn't exist
      } else {
	return callback(null, row[0]); // user exists
      }
    });
  },
  check_user(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select u.usuario_id, u.usuario_parceiro_id from usuario u where u.usuario_nome = ? and u.usuario_senha = ? and u.usuario_status = 1', params, function(err, row) {
      if (err) {
	return callback(err);
      }
      return callback(null, row);
    });

    db.close();
  }
};
