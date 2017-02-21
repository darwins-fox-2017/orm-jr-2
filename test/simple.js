"use strict"
import DBModel from "../models/db_model.js";
import Cohort from "../models/cohort.js";
import Student from "../models/student.js";

let db = new DBModel("../db/test.db")
console.log(db);

if (Student.addStudent(db, 'Deni', 'Rani', 1)) {
  console.log('test create student : success');
} else {
  console.log('test create student : failed');
}

if (Cohort.addCohort(db, 'mailtargetarian')) {
  console.log('test new cohort : failed');
} else {
  console.log('test new cohort : failed');
}

if (Student.updateStudent(db, 1, 'last_name', 'raniastri')) {
  console.log('test update student data : success');
} else {
  console.log('test update student data : success');
}
