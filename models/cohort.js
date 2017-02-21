"use strict"

import Student from "./student.js";

class Cohort {
  constructor (cohortname, id) {
    this.cohortname = cohortname
    this.id = id
  }

  static create(db, data) {
    let SEED_DATA_COHORT = `INSERT INTO COHORTs (cohort_name) VALUES ('${data.cohortname}')`;
    db.serialize(() => {
      db.run(SEED_DATA_COHORT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(SEED_DATA_COHORT, "Insert Data Cohort Success")
        }
      });
    })
  }

  static read(db, data) {
    let READ_DATA_COHORT = `SELECT * FROM cohorts`;
    db.serialize(() => {
      db.each(READ_DATA_COHORT, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(row)
        }
      });
    })
  }

  static update(db, data) {
    let UPDATE_DATA_COHORT = `UPDATE cohorts SET cohort_name= '${data.cohortname}' WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(UPDATE_DATA_COHORT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(UPDATE_DATA_COHORT, "Update Data Cohort Success")
        }
      });
    })
  }

  static delete(db, data) {
    let DELETE_DATA_COHORT = `DELETE FROM cohorts WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(DELETE_DATA_COHORT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(DELETE_DATA_COHORT, "Delete data success!!")
        }
      });
    })
  }

  static findById(db, data) {
    let FIND_DATA_COHORT = `SELECT * FROM cohorts WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(FIND_DATA_COHORT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(FIND_DATA_COHORT)
        }
      });
    })
  }

  static findAll(db, data, callback) {
    let READ_DATA = `SELECT * FROM cohorts LIMIT ${data.limit} OFFSET ${data.offset}`;
    db.serialize(() => {
      db.all(READ_DATA, function(err, data) {
        callback(data)
      })
    })
  }

  static where(db, param, callback) {
    let WHERE_DATA_COHORT = `SELECT * FROM cohorts WHERE ${param}`;
    db.serialize(() => {
      db.all(WHERE_DATA_COHORT, function(err, data) {
        callback(data)
      });
    })
  }

  static findOrCreate(db, data) {
    let FIND_DATA_COHORT = `SELECT * FROM cohorts WHERE cohort_name = '${data.cohortname}'`;
    let SEED_DATA_COHORT = `INSERT INTO cohorts (cohort_name) VALUES ('${data.cohortname}')`;
    db.serialize(() => {
      db.all(FIND_DATA_COHORT, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          if(data.length === 0) {
            db.run(SEED_DATA_COHORT, function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log(SEED_DATA_STUDENT, "Insert Data Success")
              }
            });
          } else {
            console.log("Data sudah ada sebelumnya. Silahkan entry data lain")
          }
        }
      });
    })
    return '';
  }
}

export default Cohort
