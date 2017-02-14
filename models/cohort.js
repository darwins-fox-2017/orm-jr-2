"use strict"

import Student from "./student.js";

class Cohort {

  constructor(name, id) {
    this.name = name
    this.tmp_id = id || null
  }

  static create(db, cohort) {
    db.serialize( () => {
      db.run(`INSERT INTO cohort VALUES (null, '${cohort.name}')`, (err) => {
        if(err) console.log(err)
        else console.log("Input cohort success")
      })
    })
  }

  static read(db) {
    db.serialize( () => {
      db.each(`SELECT * FROM cohort`, (err, row) => {
        if(err) console.log(err)
        else console.log(`\n ID Cohort : ${row.id}\n Cohort Name : ${row.name}`)
      })
    })
  }

  static update(db, cohort) {
    db.serialize( () => {
      db.run(`UPDATE cohort SET (name) = ('${cohort.name}') WHERE id = ${cohort.tmp_id}`, (err) => {
        if(err) console.log(err)
        else console.log("Update cohort success")
      })
    })
  }

  static delete(db, id) {
    db.serialize( () => {
      db.run(`DELETE FROM cohort WHERE id = ${id}`, (err) => {
        if(err) console.log(err)
        else console.log("Delete cohort data success")
      })
    })
  }

  static findAll(db, obj, callback) {
    db.all(`SELECT * FROM cohort LIMIT ${obj.limit} OFFSET ${obj.offset}`, (err, rows) => {
      callback(rows)
    })
  }

  static findOrCreate(db, cohort) {
    let query = `SELECT * FROM cohort WHERE name='${cohort.name}'`
    db.all(query, (err, rows) => {
      console.log(query)
      if(rows.length > 0) {
        console.log(rows)
      } else {
        this.create(db, cohort)
      }
    })
  }

}

export default Cohort
