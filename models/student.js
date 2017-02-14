"use strict"

class Student {
  constructor(firstName, lastName, phone, cohortId, id){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.cohortId = cohortId
  }

  static create(db, data){
    let SEED_DATA_STUDENT = `INSERT INTO students(firstName, lastName, phone,cohortId) VALUES('${data.firstName}','${data.lastName}','${data.phone}','${data.cohortId}')`
    db.serialize(function(){
      db.run(SEED_DATA_STUDENT, function(err) {
        err ? console.log(err):console.log(`SEED DATA STUDENT SUCCESSFUL`)
      })
    })
  }

  static update(db, data){
    let EDIT_DATA_STUDENT  = `UPDATE students SET firstName = '${data.firstName}', lastName = '${data.lastName}', phone = '${data.phone}', cohortId = '${data.cohortId}' WHERE id = ${data.id}`
    db.serialize(function(){
      db.run(EDIT_DATA_STUDENT, function(err){
        err ? console.log(err):console.log(`UPDATE DATA STUDENT SUCCESSFUL`);
      })
    })
  }

  static delete(db, id){
    let DELETE_DATA_STUDENT = `DELETE FROM students WHERE id = '${id}'`
    db.serialize(function(){
      db.run(DELETE_DATA_STUDENT, function(err) {
        err ? console.log(err):console.log(`DELETE DATA STUDENT SUCCESSFUL`);
      })
    })
  }

  static findById(db, id){
    let findById = `SELECT * FROM students WHERE id LIKE '${id}'`
    db.serialize(function() {
      db.each(findById, function(err, row) {
        err ? console.log(err):console.log(row)
      })
    })
  }

  static findAll(db, value, data){
    let SELECT_ALL = "SELECT * FROM students LIMIT ? OFFSET ?"
    db.serialize(function(){
      db.all(SELECT_ALL, value.limit, value.offset, data)
    })
  }

  static findOrCreate(db, data){
    let FIND_OR_CREATE = `SELECT * FROM students WHERE firstName = ? AND lastName = ? AND phone = ? AND cohortId = ?`;
    db.serialize(function(){
      db.all(FIND_OR_CREATE, data.firstName, data.lastName, data.phone, data.cohortId, (err, row)=> {
        row.length > 0 ? console.log(`STUDENT IS ALREADY EXISTS`):Student.create(db, data)
      })
    })
  }

  static where(db, value, data){
    let WHERE_STUDENT = "SELECT * FROM students WHERE "
    db.serialize(function(){
      db.all(WHERE_STUDENT + value, data)
    })
  }

}

export default Student
