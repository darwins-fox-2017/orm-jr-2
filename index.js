"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
import * as Repl from "repl"

let dbModel = new DBModel('db/student.db')


let argv = process.argv
if (argv[2] === 'playtime') {
  let repl = Repl.start('Command Here>')
  repl.context.dbModel = dbModel
  repl.context.Student = Student
  repl.context.Cohort  = Cohort
}
