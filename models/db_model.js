"use strict"
let sqlite = require('sqlite3')

class DBModel {
  constructor(data) {
    this.connection = new sqlite.Database(data);
  }

  setup() {
    let CREATE_STUDENTS = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, cohort_id INTEGER NOT NULL,FOREIGN KEY (cohort_id) REFERENCES cohorts(id))`
    let CREATE_COHORT   = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`;
    let db = this.connection

    db.serialize(function() {
      db.run(CREATE_STUDENTS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("create table student succeess");
        }
      });
    });

    db.serialize(function() {
      db.run(CREATE_COHORT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("create table cohort succeess");
        }
      });
    });
  }

}

export default DBModel
