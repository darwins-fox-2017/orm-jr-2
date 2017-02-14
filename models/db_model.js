"use strict"
const sqlite3 = require("sqlite3").verbose()

class DBModel {
  constructor() {
    this.connection = new sqlite3.Database("./db/student.db")
  }

  setup() {

    let QUERY_STUDENT = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT UNIQUE NOT NULL, lastname TEXT, cohort_id INTEGER)`
    let QUERY_COHORT = `CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT) `

    let INSERT_STUDENT = `INSERT INTO students(firstname, lastname) VALUES ("Adam", "Saparudin"), ("Rubi", "Henjaya"), ("Akbar", "Sahata")`
    let INSERT_COHORT = `INSERT INTO cohort VALUES (null, "Bintang"), (null, "Bulan"), (null, "Bumi")`
    let db = this.connection
    db.serialize( () => {
      db.run(QUERY_STUDENT, (err) => {
        if(err) console.log(err)
        else console.log("create table students success")
      })

      db.run(QUERY_COHORT, (err) => {
        if(err) console.log(err)
        else console.log("create table cohort success")
      })

    })

  }

}

export default DBModel
