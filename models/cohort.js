"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name) {
    this.name = name
  }

  static create(db, cohort) {
    db.serialize(() => {
      db.run(`INSERT INTO cohorts(name) VALUES ("${cohort.name}")`,
      (err) => {
        if (err) console.log(err)
        else console.log('You have added new record ')
      })
    })
  }

  static read(db) {
    db.serialize(() => {
      db.each(`SELECT * FROM cohorts`,
      (err, row) => {
        console.log(row)
      })
    })
  }

  static update(db, cohort, referenceId) {
    db.serialize(() => {
      for (let key in student) {
        db.run(`UPDATE cohorts SET ${key}="${cohort[key]}" WHERE id = ${referenceId}`,
        (err) => {
          if (err) console.log(err)
          // else console.log('You have updated record '+ cohort)
        })
      }
    })
  }

  static delete(db,id) {
    db.serialize(() => { db.run(`DELETE FROM cohorts WHERE id=${id}`, (err) => {
        if (err) console.log(err)
        else console.log('You have deleted record')
      })
    })
  }

  static findOrCreate(db, cohort) {
    db.serialize(() => {
      db.all(`SELECT * FROM cohorts WHERE name="${cohort.name}"`,
      (err, row) => {
        if(row.length === 0) Cohort.create(db, cohort)
        else console.log(row)
      })
    })
  }

  static findById(db, id) {
    db.serialize(() => {
      db.each(`SELECT * FROM cohorts WHERE id="${id}"`, (err, row) => {
        console.log(row)
      })
    })
  }

  static findAll(db, boundary, callback) {
    db.serialize(() => {
      db.all(`SELECT * FROM cohorts LIMIT ${boundary.offset}, ${boundary.limit}`, callback)
    })
  }

  static where(db, condition, callback) {
    db.serialize(() => {
      db.all(`SELECT * FROM cohorts WHERE ${condition}`, callback)
    })
  }
}

export default Cohort
