"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id){
    this.name = name
    this.id = id
  } 
  
  static create(db, data){
    let SEED_DATA_COHORT = `INSERT INTO cohorts(name) VALUES('${data.name}')`
    db.serialize(function(){
      db.run(SEED_DATA_COHORT, function(err) {
        if(err) { console.log(err) } else {console.log('COHORT CREATED');}
      })
    })
  }

  static update(db, data){
    let EDIT_DATA_COHORT  = `UPDATE cohorts SET name = '${data.name}' WHERE id = ${data.id}`
    db.serialize(function(){
      db.run(EDIT_DATA_COHORT, function(err){
        if(err) { console.log(err) } else {console.log('COHORT UPDATED');}
      })
    })
  }

  static delete(db, id){
    let DELETE_DATA_COHORT = `DELETE FROM cohorts WHERE id = '${id}'`
    db.serialize(function(){
      db.run(DELETE_DATA_COHORT, function(err) {
        if(err) { console.log(err) } else {console.log('COHORT DELETED');}
      })
    })
  }

  static findById(db, id){
    let findById = `SELECT * FROM cohorts WHERE id LIKE '${id}'`
    db.serialize(function() {
      db.each(findById, function(err, row) {        
        if(err) { console.log(err) } else {console.log(row);}
      })
    })
  }

  static findAll(db, data){
    let SELECT_ALL = "SELECT * FROM cohorts"
    db.serialize(function(){
      db.each(SELECT_ALL, function(err, row){
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


  static where(db, value, data){
    let WHERE_COHORT = "SELECT * FROM cohorts WHERE "
    db.serialize(function(){
      db.all(WHERE_COHORT + value, data)
    })
  }

}

export default Cohort
