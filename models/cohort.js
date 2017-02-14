"use strict"

import Student from "./student.js";

class Cohort {
  static addcohort(db,name){
    let ADD_COHORT_QUERY = `INSERT INTO cohorts (name) VALUES(?)`
    db.run(ADD_COHORT_QUERY,[name], function(err){
      if(err){
        console.log(err);
      }else{
        console.log('add data success');
      }
    })
  }

  static removeCohort(db,id){
    let REMOVE_COHORT_QUERY = `DELETE FROM cohorts where id=(?)`
    db.run(REMOVE_COHORT_QUERY,[id], function(err){
      if(err){
        console.log(err);
      }else{
        console.log('remove  data success');
      }
    })
  }

  static seeAllCohort(db){
    let FINDALL_COHORT_QUERY = `SELECT * FROM cohorts`
    db.each(FINDALL_COHORT_QUERY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

}

export default Cohort
