"use strict"
const sqlite = require('sqlite3').verbose()

class Student {
  constructor(firstname, lastname, phone, cohortId, id){
      this.id = id
      this.firstname = firstname
      this.lastname = lastname
      this.phone = phone
      this.cohortId = cohortId
  }

  static create(db, student){
    let query_create = `INSERT INTO students (firstname, lastname, phone, cohortId) VALUES ('${student.firstname}', '${student.lastname}','${student.phone}', '${student.cohortId}');`
    db.serialize(function(){
      db.run(query_create, function(err){
        if(err) { console.log(err) } else {console.log('DATA CREATED');}
      })
    })
  }

  static update(db, student){
    let query_update = `UPDATE students SET firstname = '${student.firstname}', lastname = '${student.lastname}', phone = '${student.phone}', cohortId = '${student.c}' WHERE id = '${student.id}'`
    db.serialize(function(){
      db.run(query_update, function(err){
        if(err) { console.log(err) } else {console.log('DATA UPDATED');}
      })
    })
  }

  static delete(db, id){
    let query_delete = `DELETE FROM students WHERE id = '${id}'`
    db.serialize(function(){
      db.run(query_delete, function(err){
        if(err) { console.log(err) } else {console.log('DATA DELETED');}
      })
    })
  }

  static findById(db, id){
    let query_findById = `SELECT * FROM students WHERE id = '${id}'`
    db.serialize(function(){
      db.each(query_findById, function(err,row){
        if(err) { console.log(err) } else {console.log(row);}
      })
    })
  }

  static findAll(db){
    let query_findAll = `SELECT * FROM students;`
    db.serialize(function(){
      db.each(query_findAll, function(err,row){
        if(err) { console.log(err) } else {console.log(row);}
      })
    })
  }
  
  static findOrCreate(db, student){
    let FIND_OR_CREATE = `SELECT * FROM students WHERE firstName = ? AND lastName = ? AND phone = ? AND cohortId = ?`;
    db.serialize(function(){
      db.all(FIND_OR_CREATE, student.firstName, student.lastName, student.phone, student.cohortId, (err, row)=> {
        row.length > 0 ? console.log(`STUDENT IS ALREADY EXISTS`):Student.create(db, student)
      })
    })
  }

  static where(db, value, callback){
    let query_where = `SELECT * FROM students WHERE ${value}`
    db.serialize(function(){
      db.all(query_where, callback)
    })
  }



}

export default Student
