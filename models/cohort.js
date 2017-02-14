"use strict"

import Student from "./student.js";

class Cohort {
  constructor(cohort_name, id) {
    this.cohort_name  = cohort_name
    this.id           = id
  }

  static create(connection, data) {
    let CREATE_COHORT = `INSERT INTO cohorts(cohort_name) VALUES ('${data.cohort_name}');`

    connection.serialize(function(){
      connection.run(CREATE_COHORT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS CREATE DATA COHORT ::.");
        }
      })
    })
  }

  static update(connection, data) {
    let UPDATE_COHORT = `UPDATE cohorts SET cohort_name = '${data.cohort_name}' WHERE id = ${data.id};`

    connection.serialize(function(){
      connection.run(UPDATE_COHORT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS UPDATE DATA COHORT ::.");
        }
      })
    })
  }

  static delete(connection, id) {
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id};`

    connection.serialize(function(){
      connection.run(DELETE_COHORT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS DELETE DATA COHORT ::.");
        }
      })
    })
  }

  static findById(connection, id) {
    let FIND_ID = `SELECT * FROM cohorts WHERE id = ${id};`

    connection.serialize(function(){
      connection.all(FIND_ID, function(err, rows){
        if (err) {
          console.log(err);
        } else {
          console.log(".::      TABLE DATA COHORT      ::.\n");
          console.log("___________________________________\n");
          console.log(" ID |\t Cohort Name    \n");

          for (let i = 0; i < rows.length; i++) {
            console.log(" "+rows[i].id+"\t"+rows[i].cohort_name);
          }
        }
      })
    })
  }

  static where(connection, value, cb) {
    let WHERE_VALUE = `SELECT * FROM cohorts WHERE ${value}`

    connection.serialize(function(){
      connection.all(WHERE_VALUE, function(err, rows){
        if (err) {
          cb(null, err)
        } else {
          cb(rows);
        }
      })
    })
  }

  static findAll(connection, option = {limit: 0, offset: 0}, cb) {
    let FIND_ALL = `SELECT cohorts.*, students.firstname, students.lastname, students.cohort_id FROM cohorts LEFT JOIN students ON students.cohort_id = cohorts.id LIMIT ${option.limit} OFFSET ${option.offset};`

    connection.serialize(function(){
      connection.all(FIND_ALL, function(err, rows){
        if (err) {
          cb(null, err)
        } else {
          cb(rows);
        }
      })
    })
  }

  static findOrCreate(connection, data) {
    let CREATE  = `INSERT INTO cohorts(cohort_name) VALUES ('${data.cohort_name}');`
    let FIND    = `SELECT * FROM cohorts WHERE cohort_name = '${data.cohort_name}';`

    connection.serialize(function(){
      connection.all(FIND, function(err, rows){
        if (err) {
          console.log(err);
        } else {
            if (rows.length == 0) {
              // console.log('TEST');
              connection.run(CREATE, function(err){
                if (err) {
                  console.log(err);
                } else {
                  console.log(".:: CREATE DATA COHORT SUCCESS ::.");
                }
              })
            } else {
              console.log(rows);
            }
        }
      })
    })
  }

  static help() {
    let menu = `create(connection, data)\nupdate(connection, data)\ndelete(connection, id)\nfindById(connection, id)\nfindAll(connection, cb)\nwhere(connection, value, data)`
    console.log(menu);
  }
}

export default Cohort

// Cohort.create(dbModel.connection, new Cohort("Cross Fox"))
// Cohort.create(dbModel.connection, new Cohort("Bland Fox"))
// Cohort.update(dbModel.connection, new Cohort("Darwin Fox 2017", 2))
// Cohort.delete(dbModel.connection, 1)
// Cohort.findById(dbModel.connection, 2)
// Cohort.findAll(dbModel.connection, {limit:2, offset: 1}, function(data, err) { if(!err) { for(var i=0; i<data.length; i++) { console.log(data[i]); } } else { console.log('Error'); } })
// Cohort.findOrCreate(dbModel.connection, new Cohort("Cross Fox", 1))
// Cohort.where(dbModel.connection, "cohort_name = 'Darwin Fox 2017'", function(data, err) {if(!err) {for(var i=0; i<data.length; i++) {console.log(data[i]);}} else {console.log('Error');}})
