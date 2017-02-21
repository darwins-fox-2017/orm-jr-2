"use strict"

class Student {
  constructor(firstname,lastname,cohort_id) {
    this.firstname = firstname
    this.lastname  = lastname
    this.cohort_id = cohort_id
  }

  static create(db, student) {
    db.serialize(() => {
      db.run(`INSERT INTO students(firstname,lastname,cohort_id) VALUES ("${student.firstname}","${student.lastname}",${student.cohort_id})`,
      (err) => {
        if (err) console.log(err)
        else console.log('You have added new record '+ student)
      })
    })
  }

  static read(db) {
    db.serialize(() => {
      db.each(`SELECT * FROM students`,
      (err, row) => {
        console.log(row)
      })
    })
  }

  static update(db, student, referenceId) {
    db.serialize(() => {
      for (let key in student) {
        db.run(`UPDATE students SET ${key}="${student[key]}" WHERE id = ${referenceId}`,
        (err) => {
          if (err) console.log(err)
          else console.log('You have updated record '+ student)
        })
      }
    })
  }

  static delete(db, id) {
    db.serialize(() => { db.run(`DELETE FROM students WHERE id="${id}"`, (err) => {
        if (err) console.log(err)
        else console.log('You have deleted record')
      })
    })
  }

  static findOrCreate(db, student) {
    db.serialize(() => {
      db.all(`SELECT * FROM students WHERE firstname="${student.firstname}" AND lastname="${student.lastname}" AND cohort_id="${student.cohort_id}"`,
      (err, row) => {
        if(row.length === 0) Student.create(db, student)
        else console.log(row)
      })
    })
  }

  static findById(db, id) {
    db.serialize(() => {
      db.each(`SELECT * FROM students WHERE id="${id}"`, (err, row) => {
        console.log(row)
      })
    })
  }

  static findAll(db, boundary, callback) {
    db.serialize(() => {
      db.all(`SELECT * FROM students LIMIT ${boundary.offset}, ${boundary.limit}`, callback)
    })
  }

  static where(db, condition, callback) {
    db.serialize(() => {
      db.all(`SELECT * FROM students WHERE ${condition}`, callback)
    })
  }
}

export default Student
