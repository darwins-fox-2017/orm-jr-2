"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id) {
    this.name = name
    this.id   = id
  }

  static create (db,object) {
    var CREATE_COHORT_QUERY = `INSERT INTO cohorts (name) VALUES ('${object.name}')`

    db.serialize(function() {
      db.run(CREATE_COHORT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("cohort created");
        }
      });
    });
  }
  // Cohort.create(dbModel.connection,new Cohort("Darwinfox"))

  static update (db,data) {
    var UPDATE_COHORT_QUERY = `UPDATE cohorts SET name = '${data.name}' WHERE id = ${data.id}`
    console.log(UPDATE_COHORT_QUERY);
    db.serialize(function() {
      db.run(UPDATE_COHORT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("cohort updated");
        }
      });
    });
  }
  // Cohort.update(dbModel.connection,new Cohort("Darwin Fox", 1))

  static delete (db, id) {
    var DELETE_COHORT_QUERY = `DELETE FROM cohorts WHERE id = ${id}`

    db.serialize(function() {
      db.run(DELETE_COHORT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("cohort deleted");
        }
      });
    });
  }
  // Cohort.delete(dbModel.connection, "4")

  static show (db) {
    var SHOW_COHORT_QUERY = `SELECT * FROM cohorts`

    db.serialize(function() {
      db.each(SHOW_COHORT_QUERY, function(err,data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });
  }
  // Cohort.show(dbModel.connection)

  static findById(db, id) {
    var FIND_ID_QUERY = `SELECT * FROM cohorts where id = ${id}`;
    db.each(FIND_ID_QUERY, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }
  // Cohort.findById(dbModel.connection, "2" )

  /* ORM 1
  static findAll (db, callback) {
    var FIND_ALL_QUERY = "SELECT * FROM cohorts"
    db.all(FIND_ALL_QUERY, function(err, rows) {
      callback(rows, err)
    })
  }

  Cohort.findAll(dbModel.connection,
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })
  */

  static where (db, str, callback) {
    var WHERE_QUERY = `SELECT * FROM cohorts WHERE ${str}`
    db.all(WHERE_QUERY, function(err, rows) {
      callback(rows, err)
    })
  }
  /*
  Cohort.where(dbModel.connection, "name = 'Crossfox' ",
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })

  */

  static findAll(db, object, callback) {
    var FIND_ALL_QUERY = `SELECT * FROM cohorts LIMIT ${object.limit} OFFSET ${object.offset}`
    db.all(FIND_ALL_QUERY,function (err,data) {
      callback(data, err)
    })
  }
  /*
  Cohort.findAll(dbModel.connection, {limit: 2,offset:1},
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })
   */

  static findOrCreate(db, object) {
    var INSERT_QUERY  = `INSERT INTO cohorts (name) VALUES ('${object.name}')`
    var CHECK_QUERY   = `SELECT * FROM cohorts WHERE name = '${object.name}'`

    db.all(CHECK_QUERY, function(err, data) {
      console.log(data);
      if(data.length) {
        console.log('data already exists');
      } else {
        db.run (INSERT_QUERY, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Cohort Added');
          }
        })
      }
    })
  }
  // Cohort.findOrCreate(dbModel.connection, new Cohort("Artic"))

}

export default Cohort
