"use strict"
const sqlite = require ('sqlite3').verbose()

class DBModel {
  constructor(filename){
    this.connection = new sqlite.Database(filename)
  }

  setup(){
    let CREATE_STUDENT_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NOT NULL,lastname TEXT,email TEXT, phone TEXT, cohort_id INTEGER NOT NULL, FOREIGN KEY(cohort_id) REFERENCES cohorts (id));`

    let CREATE_COHORT_TABLE = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT UNIQUE)`

    let db = this.connection

    db.serialize(function(){
      db.run(CREATE_STUDENT_TABLE,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Create table students success');
        }
      })
    })

    db.serialize(function(){
      db.run(CREATE_COHORT_TABLE,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Create table cohorts success');
        }
      })
    })
  }
}

export default DBModel
