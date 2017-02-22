"use strict"
const sqlite = require('sqlite3').verbose()

let CREATE_TABLE_STUDENTS= `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NOT NULL UNIQUE,lastname TEXT,cohort_id INTEGER NOT NULL, FOREIGN KEY(cohort_id) REFERENCES cohorts (id));`
let CREATE_TABLE_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT UNIQUE);`

export default class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }
    setup(){
      let connection = this.connection
      connection.serialize(function(){
        connection.run(CREATE_TABLE_STUDENTS, function(err){
          err ? console.log(err):console.log("Create table students success!!");
        })
      })
      connection.serialize(function(){
        connection.run(CREATE_TABLE_COHORTS, function(err){
          err ? console.log(err) : console.log("Create table cohorts success!!");
        })
      })
    }
}
