"use strict"

const sqlite = require('sqlite3').verbose()

class DBModel {
  constructor() {
    this.connection = new sqlite.Database('./db/student.db')
  }

  setup() {
    let CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL UNIQUE, lastname TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohort(id))"
    let CREATE_TABLE_COHORT = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT UNIQUE)"

    let db = this.connection
    db.serialize(function() {
      // Create TABLE
      db.run(CREATE_TABLE_STUDENT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Create Table Student Success");
        }
      })
      db.run(CREATE_TABLE_COHORT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Create Table Cohort Success");
        }
      })
    })
    return '';
  }
}

export default DBModel
