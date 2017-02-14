"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id) {
    this.id = id
    this.name = name
  }

  static add (db,object) {
    let QUERY_ADD = `INSERT INTO cohorts (name) VALUES ('${object.name}')`
    db.run(QUERY_ADD, function(err) {
      (err) ? console.log(err) : console.log('Data berhasil dimasukkan ke dalam tabel cohorts');
    })
    // Cohort.add(dbModel.connection, new Cohort("gajah"))
  }

  static delete (db, id) {
    let QUERY_DELETE = `DELETE FROM cohorts WHERE id = '${id}'`;
    db.run(QUERY_DELETE, function(err) {
      (err) ? console.log(err) : console.log('Data berhasil dihapus dari tabel cohorts');
    })
    // Cohort.delete(dbModel.connection, "1")
  }

  static change(db, name, id) {
    let QUERY_CHANGE = `UPDATE cohorts SET name = '${name}' WHERE id = '${id}'`;
    db.run(QUERY_CHANGE, function(err) {
      (err) ? console.log(err) : console.log('Data dari tabel cohorts berhasil dirubah');
    })
    // Cohort.change(dbModel.connection, "buaya", "6")
  }

  static show(db) {
    let QUERY_SHOW = `SELECT * FROM cohorts`;
    db.each(QUERY_SHOW, function(err, row) {
      (err) ? console.log(err) : console.log(row);
    })
  }

  static findAll(db, callback) {
    let QUERY_SHOW = `SELECT * FROM cohorts`;
    db.all(QUERY_SHOW, function(err, rows) {
      callback(rows, err)
    })
  }

  static where(db, str, callback) {
    let QUERY_SHOW_WHERE = `SELECT * FROM cohorts WHERE ${str} ;`;
    db.all(QUERY_SHOW_WHERE, function(err, rows) {
      callback(rows, err)
    })
  }

  static findById(db, id) {
    let QUERY_SHOW_ID = `SELECT * FROM cohorts where id = '${id}'`;
    db.each(QUERY_SHOW_ID, function(err, row) {
      (err) ? console.log(err) : console.log(row);
    })
    // Cohort.findId(dbModel.connection, '9');
  }

  static help() {
    console.log(`
      add : Cohort.add(dbModel.connection, new Cohort("name"))
      delete: Cohort.delete(dbModel.connection, "id")
      change name: Cohort.change(dbModel.connection, "name", "id")
      show: Cohort.show(dbModel.connection)
      `
    );
  }

  static find_All (db, obj, callback) {
    var QUERY_FINDALL = `SELECT * FROM cohorts LIMIT ${obj.limit} OFFSET ${obj.offset}`;
    //console.log(QUERY_FINDALL);
    db.all(QUERY_FINDALL, function(err, rows) {
      callback(rows, err)
    })
  }

  static findOrCreate(db, obj) {
    var QUERY_INSERT = `INSERT INTO cohorts (name) VALUES ('${obj.first_name}' )`;
    var QUERY_CHECK = `SELECT * FROM cohorts WHERE name = '${obj.first_name}' `;

    db.all(QUERY_CHECK, function(err, row) {
      console.log(row);
      if (row.length) {
        console.log("data already created");
      } else {
        db.run(QUERY_INSERT, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("COHORT added");
          }
        });
      }
    });
  }
}

export default Cohort
