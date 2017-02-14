"use strict"
const sqlite = require('sqlite3').verbose()

//SQL STATEMENT
let CREATE_COHORTS  = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
let CREATE_STUDENTS = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL UNIQUE, lastName TEXT, phone INTEGER, cohortId INTEGER, FOREIGN KEY (cohortId) REFERENCES cohorts (id))"

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }

  setup(){
    let db = this.connection
    db.serialize(function(){
      db.run(CREATE_STUDENTS, function(err){
        err ? console.log(err):console.log(`CREATE TABLE STUDENT SUCCESSFUL`);
      })
    })

    db.serialize(function(){
      db.run(CREATE_COHORTS, function(err){
        err ? console.log(err):console.log(`CREATE TABLE COHORT SUCCESSFUL`);
      })
    })
  }

}

export default DBModel
