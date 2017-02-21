"use strict"
var sqlite3 = require('sqlite3').verbose()
class DBModel {
  constructor(dbfile) {
    this.connection = new sqlite3.Database(dbfile)
  }

  setup() {
    this.connection.serialize(() => {
      this.connection.run(`CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname varchar(25),
        lastname varchar(25),
        cohort_id int
      );`, (err) => {
        if (err) console.log(err)
        else console.log('Created students table successfully')
      })
    })

    this.connection.serialize(() => {
      this.connection.run(`CREATE TABLE IF NOT EXISTS cohorts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar(25)
      );`, (err) => {
        if (err) console.log(err)
        else console.log('Created cohorts table successfully')
      })
    })
  }
}
// let dbMod = new DBModel('../db/student.db')
// dbMod.setup()

export default DBModel
