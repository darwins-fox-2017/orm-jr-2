"use strict"

class Student {
  constructor(fname, lname, cohort_id, tmp_id) {
    this.fname = fname
    this.lname = lname
    this.cohort_id = cohort_id
    this.tmp_id = tmp_id || null
  }

  static create(db, student) {
    db.serialize( () => {
      db.run(`INSERT INTO students(firstname, lastname, cohort_id) VALUES (?,?,?)`, [student.fname,student.lname, student.cohort_id], (err) => {
        if(err) console.log(err)
        else console.log("Input student success")
      })
    })
  }

  static read(db) {
    db.serialize( () => {
      db.each(`SELECT * FROM students`, (err, row) => {
        if(err) console.log(err)
        else console.log(`\n ID Student : ${row.id}\n First Name : ${row.firstname}\n Last Name : ${row.lastname}`)
      })
    })
  }

  static update(db, student) {
    db.serialize( () => {
      let query = `UPDATE students SET (firstname, lastname, cohort_id) = ('${student.fname}', '${student.lname}', ${student.cohort_id}) WHERE id = ${student.tmp_id}`;
      console.log(query)
      db.run(query, (err) => {
        if(err) console.log(err)
        else console.log("Update student success")
      })
    })
  }

  static delete(db, id) {
    db.serialize( () => {
      db.run(`DELETE FROM students WHERE id = ${id}`, (err) => {
        if(err) console.log(err)
        else console.log("Delete data success")
      })
    })
  }

  static findAll(db, obj, callback) {
    db.all(`SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset}`, (err, rows) => {
      callback(rows)
    })
  }

  static where(db, where, callback) {
    db.all(`SELECT * FROM students WHERE ${where}`, (err, rows) => {
      callback(rows)
    })
  }

  static findOrCreate(db, student) {
    let query = `SELECT * FROM students WHERE firstname = '${student.fname}' AND lastname = '${student.lname}' AND cohort_id = ${student.cohort_id}`
    db.all(query, (err, rows) => {
      // console.log(query)
      if(rows.length > 0) {
        console.log(rows)
      } else {
        this.create(db, student)
      }
    })
  }

}

export default Student
