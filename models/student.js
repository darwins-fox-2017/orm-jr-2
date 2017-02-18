"use strict"

export default class Student {
  constructor(firstname, lastname, cohort_id, id) {
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.id = id
  }

  static create(connection, data) {

    let db = connection

    let createDataStudent = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${data.firstname}', '${data.lastname}', '${data.cohort_id}')`
    db.serialize(function() {
      db.run(createDataStudent, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('INSERT Data berhasil !');
        }
      })
    })
  }

  static read(connection, data) {
    let db = connection
    let read_data_student = `SELECT * FROM student`;
    db.serialize(function() {
      db.each(read_data_student, function(err, row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    })
  }

  static update(connection, data) {
    let db = connection
    let UpdateDataStudent = `UPDATE student SET firstname = '${data.firstname}', lastname = '${data.lastname}', cohort_id = ${data.cohort_id} WHERE id = ${data.id};`
    //console.log(UpdateDataStudent);
    db.serialize(function() {
      db.run(UpdateDataStudent, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Update Data berhasil !');
        }
      })
    })
  }

  static delete(connection, id) {
    let db = connection
    let DeleteStudent = `DELETE FROM student WHERE id = ${id};`

    db.serialize(function() {
      db.run(DeleteStudent, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Delete Data Berhasil  !');
        }
      })
    })
  }

  static findById(connection, data) {
    let db = connection
    let findById = `SELECT * FROM student WHERE id = ${data}`;
    //console.log(findById);
    db.serialize(function() {
      db.each(findById, function(err, row) {
        if(err) {
          console.log(err);
        } else {
          console.log(`ID : ${row.id}`);
          console.log(`Nama Depan : ${row.firstname}`);
          console.log(`Nama Belakang : ${row.lastname}`);
          console.log(`ID Cohort : ${row.cohort_id}`);
        }
      })
    })
  }

  static findAll(connection, data) {
    let db = connection
    let findAll = `SELECT * FROM student`

    db.serialize(function() {
      db.all(findAll, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static where(connection, value, data) {
    let db = connection
    let where_student = `SELECT * FROM student WHERE`

    db.serialize(function() {
      db.all(where_student + value, data)
    })
  }
  // release 0 ORM JR 2
  static findAll(connection, data, callback) {
    let db = connection

    let findAll = `SELECT * FROM student LIMIT ${data.limit} OFFSET ${data.offset}`
    db.all(findAll, function(err, data) {
      callback(data, err)
    })
  }

  static findOrCreate(connection, data) {
    let db = connection

    let create_data = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${data.firstname}', '${data.lastname}', ${data.cohort_id})`
    let cek_data = `SELECT * FROM student WHERE firstname = '${data.firstname}' AND lastname = '${data.lastname}'`

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
  /*
    Student.findOrCreate(dbmodel.connection, new Student("Windiana", "Kris", 3))
  */
}
