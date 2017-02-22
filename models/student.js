"use strict"
class Student {
  constructor(firstname,lastname,cohort_id,id){
    this.id = id || null
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
  }
  static create(connection, id) {
      let db = connection;
      let CREATE = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${id.firstname}','${id.lastname}',${id.cohort_id});`
      db.serialize(function() {
          db.run(CREATE, function(err) {
              err ? console.log(err) : console.log("== CREATE SUCCESS ==");
          })
      })
}
  static update(connection, id){
    let db = connection;
    let UPDATE = `UPDATE students SET firstname ='${id.firstname}', lastname = '${id.lastname}', cohort_id ='${id.cohort_id}' WHERE id = ${id.id}`
      db.serialize(function(){
        db.run(UPDATE, function(err){
          err ? console.log(err) : console.log("== UPDATE SUCCESS ==");
        })
      })
  }
  static remove(connection, id){
    let db = connection;
    let REMOVE = `DELETE from students WHERE id = ${id}`
      db.serialize(function(){
        db.run(REMOVE, function(err){
          err ? console.log(err) : console.log("Remove your data");
        })
      })
    }
  static findById(connection, id){
    let db = connection;
    let FINDBYID = `SELECT * from students WHERE id = ${id}`
      db.serialize(function(){
        db.each(FINDBYID, function(err, data){
          err ? console.log(err) : console.log(data);
        })
      })
    }
    // static findAll(connection, cb) {
    //     let db = connection;
    //     let FINDALL = `SELECT * FROM students;`
    //     db.serialize(function() {
    //         db.all(FINDALL, cb)
    //     })
    // }
    static where(connection, value, cb) {
        let WHERE = `SELECT * FROM students WHERE `
        let db = connection;
        db.serialize(function() {
            db.all(WHERE + value, cb);
        })
    }
    static findAll(connection, data, callback) {
      let db = connection
      let findAll = `SELECT * FROM students LIMIT ${data.limit} OFFSET ${data.offset}`
        db.all(findAll, function(err, data) {
          callback(data, err)
        })
      }
      static findOrCreate(db,data){

    let VALIDATION = `SELECT * FROM students WHERE firstname = "${data.firstname}" AND lastname = "${data.lastname}" AND cohort_id = "${data.cohort_id}"`

    db.serialize(function(){
      db.all(VALIDATION,function(err,row){
        if(err){
          console.log(err);
        }else if(row.length > 0){
          console.log('Data already exists');
        }else{
          Student.create(db,data)
        }
      })
    })
  }

}
export default Student
// Student.update(dbModel.connection, new Student("Windi", "Krisma", 2,1))
//Student.create(dbModel.connection, new Student("Hendra", "takur", 3))
// Student.remove(dbModel.connection, 3)
// Student.findById(dbModel.connection, 2)
// Student.findAll(dbModel.connection, function(err, data) {
//   if(!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log('error');
//   }
// })
  //   Student.where(dbModel.connection, "firstname = 'wahyu'", function(err, data) {
  //   if (!err) {
  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i])
  //     }
  //   } else {
  //     console.log(data);
  //   }
  // });

  //orm 2
  // Student.findAll(dbModel.connection, {limit : 2, offset : 1}, function(data, err){
  //   if(!err){
  //     for(var i = 0; i<data.length; i++){
  //       console.log(data[i]);
  //     }
  //   }else{
  //     console.log('Error')
  //   }
  // })
