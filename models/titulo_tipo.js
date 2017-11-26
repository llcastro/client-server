const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db_path = path.resolve(__dirname, 'db/serasa.db');

module.exports = {
  get_all: function(callback) {
    let db = new sqlite3.Database(db_path);

    db.all('', function(err, rows) {
      if (err) {
	return callback(err);
      }
      return callback(null, rows);
    });

    db.close();
  },
  get_by_id: function(id, callback) {
    let db = new sqlite3.Database(db_path);

    db.all('select titulo_tipo_id, titulo_tipo_nome from titulo_tipo where titulo_tipo_id = ?', [id], function(err, row) {
      if (err) {
	return callback(err);
      }
      return callback(null, row[0]);
    });

    db.close();
  },
  insert: function(params, callback) {
    let db = new sqlite3.Database(db_path);

    db.run('', params, function(err) {
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

    db.run('', params, function(err) {
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
  }
};
