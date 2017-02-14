"use strict"
const repl = require("repl")

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let dbModel = new DBModel()

let help = () => {
  console.log("> dbModel.setup() to set database tabel")
  console.log(`> Student.create(dbModel.connection, new Student("Azis", "Abdul", 1)) to insert student`);
  console.log(`> Student.update(dbModel.connection, new Student("Azis", "Krisna", 1, 1)) to update
Where first value is firstname, second is lastname, third is cohort_id, last one is which id student you want to update`);
  console.log(`> Student.delete(dbModel.connection, 1) to delete student where last param is student id`)
  console.log(`> Student.findById(dbModel.connection, 1) to display detail data and last param is ID`);
  console.log(`> Student.findAll() read all user but don't forget to set callback first`);
  console.log(`> Student.where() show user data by looking specific param on sql, write it on the function you stupid`)

}

if(process.argv[2] == 'playtime') {
  let r = repl.start("> ")
  r.context.dbModel = dbModel
  r.context.Student = Student
  r.context.Cohort = Cohort
  r.context.help = help
} else {
  console.log("Run with 'playtime' command please.");
}
