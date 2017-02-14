"use strict"

class Student {
  constructor(first_name, last_name, cohorts_id, id) {
    this.first_name = first_name
    this.last_name = last_name
    this.cohorts_id = cohorts_id
    this.id = id
  }

  static add (db, obj) {
    let QUERY_ADD = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.cohorts_id}' )`;
    db.run(QUERY_ADD, function(err) {
      (err) ? console.log(err) : console.log('Data berhasil dimasukkan ke dalam tabel student');
    });
    // Student.add(dbModel.connection, new Student("endy","santoso","8"))
  }

  static delete (db, id) {
    let QUERY_DELETE = `DELETE FROM students WHERE id = ${id}`;
    db.run(QUERY_DELETE, function(err) {
      (err) ? console.log(err) : console.log('Data berhasil dihapus dari tabel student');
    });
  }

  static changeFirst_name (db, first_name, id) {
    let QUERY_CHANGE_FIRST_NAME = `UPDATE students SET first_name = '${first_name}'  WHERE id = '${id}'`;
    db.run(QUERY_CHANGE_FIRST_NAME, function(err) {
      (err) ? console.log(err) : console.log('Data first name berhasil di update');
    });
  }

  static change_Last_name (db, last_name, id) {
    let QUERY_CHANGE_LAST_NAME = `UPDATE students SET last_name = '${last_name}'  WHERE id = '${id}'`;
    db.run(QUERY_CHANGE_LAST_NAME, function(err) {
      (err) ? console.log(err) : console.log('Data last name berhasil di update');
    });
  }

  static change_Cohorts_id (db, cohorts_id, id) {
    let QUERY_CHANGE_COHORTS_ID = `UPDATE students SET cohorts_id = '${cohorts_id}'  WHERE id = '${id}'`;
    db.run(QUERY_CHANGE_COHORTS_ID, function(err) {
      (err) ? console.log(err) : console.log('Data cohorts id berhasil di update');
    });
  }

  static show (db) {
    let QUERY_SHOW = `SELECT * FROM students`;
    db.each(QUERY_SHOW, function(err, row) {
      (err) ? console.log(err) : console.log(row);
    });
  }

  static findAll (db, callback) {
    let QUERY_SHOW_ALL = `SELECT * FROM students`;
    db.all(QUERY_SHOW_ALL, function(err, rows) {
      callback(rows, err);
    })
  }

  static where (db, str, callback) {
    let QUERY_SHOW = `SELECT * FROM students WHERE ${str} ;`;
    db.all(QUERY_SHOW, function(err, rows) {
      callback(rows, err)
    })
  }

  static findId(db, id) {
    let QUERY_FIND_ID = `SELECT * FROM students where id = '${id}'`;
    db.each(QUERY_FIND_ID, function(err, row) {
      (err) ? console.log(err) : console.log(row);
    });
  }

  static help() {
    console.log(`
      add : Student.add(dbModel.connection, new Cohort("name"))
      delete: Student.delete(dbModel.connection, "id")
      change first name: Student.changeFirst_name(dbModel.connection, "first_name", "id")
      change last name: Student.change_Last_name(dbModel.connection, "last_name", "id")
      change name: Student.change_Cohorts_id(dbModel.connection, "first_name", "id")
      show: Student.show(dbModel.connection)
      `
    );
  }

  static find_All (db, obj, callback) {
    var QUERY_FINDALL = `SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset}`;
    console.log(QUERY_FINDALL);
    db.all(QUERY_FINDALL, function(err, rows) {
      callback(rows, err)
    })
  }

  static findOrCreate(db, obj) {
    var QUERY_INSERT = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.cohorts_id}' )`;
    var QUERY_CHECK = `SELECT * FROM students WHERE first_name = '${obj.first_name}' AND last_name = '${obj.last_name}' `;

    db.all(QUERY_CHECK, function(err, row) {
      console.log(row);
      if (row.length) {
        console.log("data already created");
      } else {
        db.run(QUERY_INSERT, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("STUDENT added");
          }
        });
      }
    });
  }
}

export default Student
