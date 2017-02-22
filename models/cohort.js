"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name) {
      this.name = name;
  }
  static create(connection, nameCohort) {
    let db = connection;
    let CREATE = `INSERT INTO cohort (name) VALUES ('${nameCohort.name}');`
    db.serialize(function() {
        db.run(CREATE, function(err) {
            err?console.log(err) : console.log('CREATE');
          })
        })
    }

      // UPDATE Data Cohort
      static update(connection, paramCohort) {
          let UPDATE = "UPDATE cohorts SET name = ? WHERE id=?"
          let db = connection;
          db.serialize(function() {
              db.run(UPDATE, paramCohort.name, function(err) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log('UPDATE !!');
                  }
              })
          })
      }
      // Delete cohort data
      static delete(connection, id) {
          let db = connection;
          let DELETE = "DELETE FROM cohorts WHERE id=?"
          db.serialize(function() {
              db.run(deleteDataStudent, {
                      $id: id
                  },
                  function(err, row) {
                      if (err) {
                          console.log(err);
                      } else {
                          console.log(row);
                      }
                  });
          });
      }
      //
      // FIND ID Data Cohort
      static findById(connection, id) {
          let FIND = "SELECT * FROM cohorts WHERE id=?"
          let db = connection;
          db.serialize(function() {
              db.each(FIND, id, function(err, row) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log(row);
                  }
              })
          })
      }
      static findAll(connection, cb) {
          let db = connection;
          db.serialize(function() {
              db.all(FIND_ALL, cb)
          })
      }
  }
export default Cohort
