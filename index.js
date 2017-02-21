"use strict"
const repl = require('repl')
import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";


let dbModel = new DBModel('./db/student.db')
// dbModel.createTable()
// console.log(dbModel);

let arg = process.argv;
if (arg.length>2) {
  if (arg[2].toLowerCase() == 'playtime') {
     let r = repl.start(' > ')
     r.context.dbModel = dbModel.dbName
     r.context.createTable = dbModel.createTable
     r.context.Student = Student
     r.context.addStudent=Student.addStudent
     r.context.updateStudent=Student.updateStudent
     r.context.showAllStudent=Student.showAllStudent
     r.context.findAll=Student.findAll
     r.context.findStudent=Student.findStudent
     r.context.findOrCreate=Student.findOrCreate
     r.context.generateFakeStudentData=Student.generateFakeStudentData
     r.context.generateFakeCohortData=Cohort.generateFakeCohortData
    //  Cohort
     r.context.addCohort=Cohort.addCohort
     r.context.showAllCohort=Cohort.showAllCohort
     r.context.removeCohort=Cohort.removeCohort
     r.context.seecohort=Cohort.seeAllCohort
     r.context.help=Student.help

  }
}
