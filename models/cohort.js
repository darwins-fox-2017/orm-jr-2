"use strict"

import Student from "./student.js";

class Cohort {

  constructor(name) {
    this.name = name
  }

  static create(connection, data) {

    let db = connection

    let createDataCohort = `INSERT INTO cohort (name) VALUES ('${data.name}')`
    db.serialize(function() {
      db.run(createDataCohort, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('INSERT Data berhasil !');
        }
      })
    })
  }

  // release 0 ORM JR 2
  static findAll(connection, data, callback) {
    let db = connection

    let findAll = `SELECT * FROM cohort LIMIT ${data.limit} OFFSET ${data.offset}`
    db.all(findAll, function(err, data) {
      callback(data, err)
    })
  }

  static findOrCreate(connection, data) {
    let db = connection

    let create_data = `INSERT INTO cohort (name) VALUES ('${data.name}')`
    let cek_data = `SELECT * FROM cohort WHERE name = '${data.name}'`

    db.all(cek_data, function(err, data) {
      console.log(data);
      if (data.length) {
        console.log('Data Sudah ada!');
      } else {
        db.serialize(function() {
          db.run(create_data, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Student Added");
            }
          });
        });
      }
    })
  }

}

export default Cohort
