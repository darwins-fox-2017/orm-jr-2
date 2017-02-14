"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl    = require('repl')
const sqlite  = require('sqlite3').verbose()

var db = new DBModel("./db/student.db")
var p  = process.argv[2]

function help(){
  let menu = `dbModel\ndbModel.setup()`
  console.log(menu);
}

if (p == "playtime") {
  var replstart = repl.start('> ')
  replstart.context.dbModel = db
  replstart.context.help    = help
  replstart.context.Student = Student
  replstart.context.Cohort  = Cohort
}
