"use strict"

const repl = require('repl')

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let playtime = process.argv
let command = playtime.slice(2).join('')

if (command == 'playtime') {
  let dbmodel = new DBModel()

  var r = repl.start('> ')
  r.context.dbmodel = dbmodel
  r.context.Student = Student
  r.context.Cohort = Cohort
}
