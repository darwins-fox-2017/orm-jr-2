"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require("repl")
const sqlite = require('sqlite3').verbose();

var db = new DBModel("./db/student.db")
var argv = process.argv[2]
// console.log(argv);

if (argv == 'playtime') {
  var start = repl.start('> ')
  start.context.dbModel = db
  start.context.Student = Student
  start.context.Cohort  = Cohort
} else {
  console.log(`You should input 'playtime' after index.js like => $ babel-node index.js playtime'`);
}
