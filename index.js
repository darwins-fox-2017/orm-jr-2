"use strict"

const repl = require("repl")

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let db = new DBModel("./db/test.db")
let argv = process.argv[2]

class Help {
  static help() {
    console.log('ADD NEW STUDENT/COHORT...........: insert(\'firstname\', \'lastname\', \'phone\')');
    console.log('REMOVE STUDENT/COHORT............: delete(id)  ');
    console.log('UPDATE STUDENT\'s DETAIL..........: update(\'firstname\', \'lastname\', \'phone\', \'id\')  ');
    console.log('SHOW ALL STUDENTS/COHORT.........: see the code for a test drive case!!');
    console.log('FIND BY ID/ALL STUDENT/COHORT....: see the code for a test drive case!!');
    console.log('WHERE STUDENT/COHORT.............: see the code for a test drive case!!');
    console.log('FindOrCreate STUDENT/COHORT......: see the code for a test drive case!!');
  }
}

if (argv == "playtime") {
  let start = repl.start('> ')
  start.context.dbModel = db
  start.context.Student = Student
  start.context.Cohort  = Cohort
  start.context.Help = Help.help
}

//Student

// Student.create(dbModel.connection, new Student("asep","ganteng",1234567,1))
// Student.update(dbModel.connection, new Student("sam", "ganeng",1234567,1,1))
// Student.delete(dbModel.connection, 2)
// Student.findById(dbModel.connection, 1)

// Student.findAll(dbModel.connection, function(data, err){
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i])
//     }
//   }else {
//       console.log(err);
//   }
// })

// Student.findOrCreate(dbModel.connection, new Student("raisa","andriana",08992969500,2))

// Student.where(dbModel.connection, "firstName = 'raisa'", function(err, data){
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i])
//     }
//   }else {
//     console.log(err)
//   }
// })


//Cohort

// Cohort.create(dbModel.connection, new Cohort("Angkatan 2"))
// Cohort.update(dbModel.connection, new Cohort("Angkatan 2",1))
// Cohort.delete(dbModel.connection, 1)
// Cohort.findById(dbModel.connection, 1)

// Cohort.findAll(dbModel.connection, function(data, err){
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i])
//     }
//   }else {
//       console.log(err);
//   }
// })

// Student.findOrCreate(dbModel.connection, new Student("xxx","vvv",08992969500,2))

// Cohort.where(dbModel.connection, "name = 'Angkatan 2'", function(err, data){
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i])
//     }
//   }else {
//     console.log(err)
//   }
// })