"use strict"

const repl    = require('repl')
const sqlite  = require('sqlite3').verbose()

let CREATE_TABLE_STUDENTS  = "CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER)"
let CREATE_TABLE_COHORTS   = "CREATE TABLE IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT NOT NULL)"

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file)
  }

  setup() {
    let db = this.connection

    let createStudent = () => {
      db.serialize(function() {
        db.run(CREATE_TABLE_STUDENTS, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(".:: SUCCESS CREATE TABLE STUDENTS ::.");
          }
        })
      })
    }


    let createCohort = () => {
      db.serialize(function() {
        db.run(CREATE_TABLE_COHORTS, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(".:: SUCCESS CREATE TABLE COHORTS ::.");
          }
        })
      })
    }

    createStudent()
    createCohort()
  }
}

export default DBModel
