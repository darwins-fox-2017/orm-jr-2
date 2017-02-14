"use strict"

class Student {
  constructor(firstname,lastname,email,phone,cohort_id,id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.email = email
    this.phone = phone
    this.id = id
  }


  static create(db,data){
    let CREATE_STUDENT = `INSERT INTO  students (firstname, lastname, email, phone, cohort_id) VALUES ("${data.firstname}","${data.lastname}","${data.email}","${data.phone}",${data.cohort_id});`

    db.serialize(function(){
      db.run(CREATE_STUDENT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Add student data has been successfully added to database');
        }
      })
    })
  }


  static update(db,data){
    let UPDATE_STUDENT = `UPDATE students SET firstname = "${data.firstname}", lastname = "${data.lastname}", email = "${data.email}", phone = "${data.phone}", cohort_id = "${data.cohort_id}"  WHERE id = ${data.id} ;`

    db.serialize(function(){
      db.run(UPDATE_STUDENT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`Data has been successfully updated/changes`);
        }
      })
    })
  }

  static remove(db,id){
    let DELETE_STUDENT = `DELETE FROM students WHERE id = ${id};`

    db.serialize(function(){

      db.run(DELETE_STUDENT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`student data with id ${id} has been successfully removed!`);
        }
      })
    })
  }

  static findById(db,id){
    let FIND_BY_ID_STUDENT = `SELECT * FROM students WHERE id = ${id};`

    db.serialize(function(){
      db.each(FIND_BY_ID_STUDENT,function(err,row){
        if(err){
          console.log(err);
        }else{
          console.log(`ID : ${row.id}`);
          console.log(`Name : ${row.firstname} ${row.firstname}`);
          console.log(`e-mail : ${row.email}`);
          console.log(`phone : ${row.phone}`);
          console.log(`cohort_id : ${row.cohort_id}`);
        }
      })
    })
  }

  static findAll(db,value,callback){
    let FIND_ALL_STUDENTS = `SELECT * FROM students LIMIT ${value.limit} OFFSET ${value.offset};`

    db.serialize(function(){
      db.all(FIND_ALL_STUDENTS,function(err,row){
        if(err){
          console.log(err);
        }else{
          callback(row)
        }
      })
    })
  }


  static where(db,detail,callback){
    let FIND_STUDENT = `SELECT * FROM students WHERE ${detail};`

    db.serialize(function(){
      db.all(FIND_STUDENT,function(err,row){
        if(err){
          console.log(err);
        }else{
          callback(row)
        }
      })
    })
  }

  static findOrCreate(db,data){

    let VALIDATION = `SELECT * FROM students WHERE firstname = "${data.firstname}" AND lastname = "${data.lastname}" AND email = "${data.email}" AND phone = "${data.phone}" AND cohort_id = "${data.cohort_id}"`

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

  static help(){
    console.log(`Help Menu`);
    console.log(`==================================================================`);
    console.log(`Student.findOrCreate(dbModel.connection,new Student(1,2,3,4,5))`);
    console.log(`1 = firstname, 2 = lastname 3 = email`);
    console.log(`4 = phone, 5 = cohort_id 6 = id to be removed/updated (only for update data)\n`);
    console.log(`Student.update(dbModel.connection,new Student(1,2,3,4,5,6))`);
    console.log(`Student.remove(dbModel.connection,id_to_be_removed)`);
    console.log(`Student.findById(dbModel.connection,id)`);
    console.log(`Student.findAll(dbModel.connection,[callback function]`);
    console.log(`Student.where(dbModel.connection,"statment_to_match",[callback function]`);
    console.log(`===================================================================`);
  }

}

export default Student

// Student.create(dbModel.connection,new Student("Firman","Pebrizal","ftm.pebrizal@gmail.com","081275799783",3))
//Student.create(dbModel.connection,new Student("Yoli","Putri","yoli@gmail.com","0812025155",2))
// Student.update(dbModel.connection,new Student("Wahyu","Hidayat","wah@gmail.com","0812025155",3,2))
// Student.remove(dbModel.connection, 6)
// Student.findById(dbModel.connection, 2)
// Student.findAll(dbModel.connection, function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})
// Student.where(dbModel.connection, "lastname = 'Pebrizal'", function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})


// data yang sudah ada
// Student.findOrCreate(dbModel.connection,new Student("Yuni","Setiawan","YunSet@gmail.com","0853665083",2))

// Student.findAll(dbModel.connection, {limit : 2, offset: 1}, function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})
