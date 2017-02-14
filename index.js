"use strict"
const repl = require('repl');
import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let dbModel = new DBModel('./db/student.db');
//newdata.createTabel()

//Student.addstudent(newdata._db,new Student('ego','gola',2))
//Student.findAll(newdata._db)

let argv = process.argv;
if (argv.length>2) {
  if (argv[2].toLowerCase() == 'playtime') {
     let r = repl.start('=>');
     r.context.dbModel=dbModel._db;
     r.context.Student = Student;
     r.context.addstudent=Student.addstudent;
     r.context.update=Student.update;
     r.context.remove=Student.remove;
     r.context.findbyid=Student.findById;
     r.context.findall=Student.findAll;
     r.context.findby=Student.findBy;
     r.context.addcohort=Cohort.addcohort;
     r.context.removecohort=Cohort.removeCohort;
     r.context.seecohort=Cohort.seeAllCohort;
     r.context.findandinsert = Student.findAddStudent;
     r.context.findalllimit=Student.findAllLimitOffset;
     r.context.help=Student.help;

  }
}
