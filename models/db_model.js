"use strict"
let sqlite3 = require('sqlite3');

class DBModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file); 
  }

  setup() {
    let CREATE_STUDENTS = `CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, cohorts_id INTEGER NOT NULL, FOREIGN KEY (cohorts_id) REFERENCES cohorts(id) )`
    let CREATE_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`
    let db = this.connection
    db.serialize(function() {
      db.run(CREATE_STUDENTS, function(err) {
        (err) ? console.log(err) : console.log('table students berhasil dibuat');
      });

      db.run(CREATE_COHORTS, function(err) {
        (err) ? console.log(err) : console.log('table cohorts berhasil dibuat');
      });
    });
  }
}

export default DBModel
