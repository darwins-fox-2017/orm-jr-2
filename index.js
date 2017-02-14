"use strict"


import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
let filename = './db/student.db'
let dbModel = new DBModel(filename)
let input = repl.start('> ')

input.context.dbModel = dbModel

input.context.Cohort = Cohort
input.context.Student = Student
