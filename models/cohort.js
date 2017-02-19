"use strict"
var faker = require('faker');

import Student from "./student.js";

class Cohort {
  static addCohort(db, name){
    let ADD_COHORT_QUERY = `INSERT INTO cohorts (name) VALUES (?)`
    db.run(ADD_COHORT_QUERY, [name], function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`${name} succesfully added to the cohorts table`);
        return true
      }
    })
  }

  static showAllCohort(db){
    let SHOW_ALL_COHORT_QUERY = `SELECT * FROM cohorts`
    db.each(SHOW_ALL_COHORT_QUERY, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static removeCohort(db, id){
    let DELETE_COHORT_QUERY = `DELETE FROM cohorts WHERE id = ${id}`
    db.run(DELETE_COHORT_QUERY, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Cohort with ${id} deleted`);
      }
    })
  }

  static generateFakeCohortData(db, totalNumber){
    for (let i = 0; i < totalNumber; i++) {
      Cohort.addCohort(db, faker.company.companyName())
    }
  }

}

export default Cohort
