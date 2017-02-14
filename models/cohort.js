"use strict"

class Cohort {
  constructor(name, id){
    this.name = name
    this.id = id
  }

  static create(db, data){
    let SEED_DATA_COHORT = `INSERT INTO cohorts(name) VALUES('${data.name}')`
    db.serialize(function(){
      db.run(SEED_DATA_COHORT, function(err) {
        err ? console.log(err):console.log(`SEED DATA COHORT SUCCESSFUL`)
      })
    })
  }

  static update(db, data){
    let EDIT_DATA_COHORT  = `UPDATE cohorts SET name = '${data.name}' WHERE id = ${data.id}`
    console.log(EDIT_DATA_COHORT);
    db.serialize(function(){
      db.run(EDIT_DATA_COHORT, function(err){
        err ? console.log(err):console.log(`UPDATE DATA COHORT SUCCESSFUL`);
      })
    })
  }

  static delete(db, id){
    let DELETE_DATA_COHORT = `DELETE FROM cohorts WHERE id = '${id}'`
    db.serialize(function(){
      db.run(DELETE_DATA_COHORT, function(err) {
        err ? console.log(err):console.log(`DELETE DATA COHORT SUCCESSFUL`);
      })
    })
  }

  static findById(db, id){
    let findById = `SELECT * FROM cohorts WHERE id LIKE '${id}'`
    db.serialize(function() {
      db.each(findById, function(err, row) {
        err ? console.log(err):console.log(row)
      })
    })
  }

  static findAll(db, data){
    let SELECT_ALL = "SELECT * FROM cohorts"
    db.serialize(function(){
      db.all(SELECT_ALL, function(err, row){
        err ? console.log(err):console.log(row);
      })
    })
  }

  static findAll(db, value, data){
    let SELECT_ALL = "SELECT * FROM cohorts LIMIT ? OFFSET ?"
    db.serialize(function(){
      db.all(SELECT_ALL, value.limit, value.offset, data)
    })
  }

  static findOrCreate(db, data){
    let FIND_OR_CREATE = `SELECT * FROM cohorts WHERE name = ? `;
    db.serialize(function(){
      db.all(FIND_OR_CREATE, data.name, (err, row)=> {
        row.length > 0 ? console.log(`COHORT IS ALREADY EXISTS`):Cohort.create(db, data)
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
