"use strict"
//const repl = require('repl')
const sqlite = require('sqlite3').verbose()

class DBModel {

  constructor(file) {
    this.connection = new sqlite.Database(file)
  }

  setup() {
    let db = this.connection

    let create_table_student = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER)";
    db.serialize(function() {
      db.run(create_table_student, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('CREATE TABLE STUDENT BERHASIL !');
        }
      });
    });

    let create_table_cohort = "CREATE TABLE IF NOT EXISTS cohort ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";
    db.serialize(function() {
      db.run(create_table_cohort, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('CREATE TABLE COHORT BERHASIL !');
        }
      });
    });
  }

}

export default DBModel
