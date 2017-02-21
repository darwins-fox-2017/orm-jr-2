"use strict"

class Student {
  constructor(firstname, lastname, cohortid, id) {
    this.firstname = firstname
    this.lastname = lastname
    this.cohortid = cohortid
    this.id = id
  }

  static create(db, data) {
    let SEED_DATA_STUDENT = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${data.firstname}','${data.lastname}',${data.cohortid})`;
    db.serialize(() => {
      db.run(SEED_DATA_STUDENT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(SEED_DATA_STUDENT, "Insert Data Success")
        }
      });
    })
    return '';
  }

  static read(db, data) {
    let READ_DATA = `SELECT * FROM students`;
    db.serialize(() => {
      db.each(READ_DATA, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(row)
        }
      });
    })
  }

  static update(db, data) {
    let UPDATE_DATA_STUDENT = `UPDATE students SET firstname= '${data.firstname}', lastname = '${data.lastname}', cohort_id = ${data.cohortid} WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(UPDATE_DATA_STUDENT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(UPDATE_DATA_STUDENT, "Update Data Success")
        }
      });
    })
  }

  static delete(db, data) {
    let DELETE_DATA_STUDENT = `DELETE FROM students WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(DELETE_DATA_STUDENT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(DELETE_DATA_STUDENT, "Delete data success!!")
        }
      });
    })
  }

  static findById(db, data) {
    let FIND_DATA_STUDENT = `SELECT * FROM students WHERE id = ${data.id}`;
    db.serialize(() => {
      db.run(FIND_DATA_STUDENT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(FIND_DATA_STUDENT)
        }
      });
    })
  }

  static findAll(db, data, callback) {
    let READ_DATA = `SELECT * FROM students LIMIT ${data.limit} OFFSET ${data.offset}`;
    db.serialize(() => {
      db.all(READ_DATA, function(err, data) {
        callback(data)
      })
    })
    return ''
  }

  static where(db, param, callback) {
    let WHERE_DATA_STUDENT = `SELECT * FROM students WHERE ${param}`;
    db.serialize(() => {
      db.all(WHERE_DATA_STUDENT, function(err, data) {
        callback(data)
      });
    })
  }

  static findOrCreate(db, data) {
    let FIND_DATA_STUDENT = `SELECT * FROM students WHERE firstname = '${data.firstname}' AND lastname = '${data.lastname}' AND cohort_id = ${data.cohortid}`;
    let SEED_DATA_STUDENT = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${data.firstname}','${data.lastname}',${data.cohortid})`;
    db.serialize(() => {
      db.all(FIND_DATA_STUDENT, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          if(data.length === 0) {
            db.run(SEED_DATA_STUDENT, function(err) {
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

export default Student
