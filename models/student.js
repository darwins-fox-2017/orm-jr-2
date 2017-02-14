"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id_student) {
    this.firstname  = firstname
    this.lastname   = lastname
    this.cohort_id  = cohort_id
    this.id_student = id_student
  }

  static create(connection, data) {
    let CREATE_STUDENT = `INSERT INTO students(firstname, lastname, cohort_id) VALUES ('${data.firstname}', '${data.lastname}', '${data.cohort_id}');`

    connection.serialize(function(){
      connection.run(CREATE_STUDENT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS CREATE DATA STUDENT ::.");
        }
      })
    })
  }

  static update(connection, data) {
    let UPDATE_STUDENT = `UPDATE students SET firstname = '${data.firstname}', lastname = '${data.lastname}', cohort_id = ${data.cohort_id} WHERE id = ${data.id_student};`

    connection.serialize(function(){
      connection.run(UPDATE_STUDENT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS UPDATE DATA STUDENT ::.");
        }
      })
    })
  }

  static delete(connection, id) {
    let DELETE_STUDENT = `DELETE FROM students WHERE id = ${id};`

    connection.serialize(function(){
      connection.run(DELETE_STUDENT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(".:: SUCCESS DELETE DATA STUDENT ::.");
        }
      })
    })
  }

  static findById(connection, id) {
    let FIND_ID = `SELECT * FROM students WHERE id = ${id};`

    connection.serialize(function(){
      connection.all(FIND_ID, function(err, rows){
        if (err) {
          console.log(err);
        } else {
          console.log(".::             TABLE DATA STUDENT             ::.\n");
          console.log("__________________________________________________\n");
          console.log(" ID |\t First Name |\t Last Name |\t Cohort     \n");

          for (let i = 0; i < rows.length; i++) {
            console.log(" "+rows[i].id+"\t"+rows[i].firstname+"\t\t"+rows[i].lastname+"\t\t"+rows[i].cohort_id);
          }
        }
      })
    })
  }

  static where(connection, value, cb) {
    let WHERE_VALUE = `SELECT * FROM students WHERE ${value}`

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
    let FIND_ALL = `SELECT students.*, cohorts.cohort_name FROM students LEFT JOIN cohorts ON students.cohort_id = cohorts.id LIMIT ${option.limit} OFFSET ${option.offset};`

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
    let CREATE  = `INSERT INTO students(firstname, lastname, cohort_id) VALUES ('${data.firstname}', '${data.lastname}', ${data.cohort_id});`
    let FIND    = `SELECT * FROM students WHERE firstname = '${data.firstname}' AND lastname = '${data.lastname}' AND cohort_id = ${data.cohort_id};`

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
                  console.log(".:: CREATE DATA STUDENT SUCCESS ::.");
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
    let menu = `create(connection, data)\nupdate(connection, data)\ndelete(connection, id)\nfindById(connection, id)\nfindAll(connection, cb)\nwhere(connection, value, data)\nfindOrCreate(connection, data)`
    console.log(menu);
  }
}

export default Student

// Student.create(dbModel.connection, new Student("Isumi", "Karina", 1))
// Student.create(dbModel.connection, new Student("Aiko", "Diandra", 2))
// Student.update(dbModel.connection, new Student("Isumi", "zumi", 1, 1))
// Student.delete(dbModel.connection, 2)
// Student.findById(dbModel.connection, 1)
// Student.where(dbModel.connection, "firstname = 'Isumi'", function(data, err) {if(!err) {for(var i=0; i<data.length; i++) {console.log(data[i]);}} else {console.log('Error');}})
// Student.findAll(dbModel.connection, {limit:2, offset: 1}, function(data, err) { if(!err) { for(var i=0; i<data.length; i++) { console.log(data[i]); } } else { console.log('Error'); } })
// Student.findOrCreate(dbModel.connection, new Student("Aiko", "Aurora", 1))
// Student.findOrCreate(dbModel.connection, new Student("Karina", "Putri", 2))
// Student.help()
