const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');
const crypto = require('crypto');

module.exports = {
  login: function(params, callback) {
    this.check_user(params, function(err, rows) {
      if (err) {
	return callback(err);
      } else if(!rows.length) {
	return callback(null, 1); // user doesn't exist
      } else {
	return crypto.randomBytes(128, (err, buf) => {
	  if (err) {
	    return callback(err);
	  }
	  return callback(null, buf.toString('hex'));
	});
      }
    });
  },
  check_user(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select u.usuario_nome as nome_usuario, u.usuario_senha as senha from usuario u where u.usuario_nome = ? and u.usuario_senha = ?', params, function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  }
};
