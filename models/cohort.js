"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id){
    this.name = name
    this.id = id
  }

  static create(db,data){
    let CREATE_COHORT = `INSERT INTO  cohorts (cohort_name) VALUES ("${data.name}");`

    db.serialize(function(){
      db.run(CREATE_COHORT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Add cohort data success');
        }
      })
    })
  }

  static update(db,data){
    let UPDATE_COHORT = `UPDATE cohorts SET cohort_name = "${data.name}" WHERE id = ${data.id} ;`

    db.serialize(function(){
      db.run(UPDATE_COHORT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`cohort's name for id ${data.id} has been successfully updated/changes`);
        }
      })
    })
  }

  static remove(db,id){
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id};`

    db.serialize(function(){

      db.run(DELETE_COHORT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`cohort data with id ${id} has been successfully removed!`);
        }
      })
    })
  }


  static findAll(db,value,callback){
    let FIND_ALL_COHORTS = `SELECT * FROM cohorts LIMIT ${value.limit} OFFSET ${value.offset};`

    db.serialize(function(){
      db.all(FIND_ALL_COHORTS,function(err,row){
        if(err){
          console.log(err);
        }else{
          callback(row)
        }
      })
    })
  }

  static where(db,detail,callback){
    let FIND_COHORT = `SELECT * FROM cohorts WHERE ${detail};`

    db.serialize(function(){
      db.all(FIND_COHORT,function(err,row){
        if(err){
          console.log(err);
        }else{
          callback(row)
        }
      })
    })
  }

  static findOrCreate(db,data){

    let VALIDATION = `SELECT * FROM cohorts WHERE cohort_name = "${data.name}"`

    db.serialize(function(){
      db.all(VALIDATION,function(err,row){
        if(err){
          console.log(err);
        }else if(row.length > 0){
          console.log('Data already exists');
        }else{
          Cohort.create(db,data)
        }
      })
    })
  }

  static help(){
    console.log(`Help Menu`);
    console.log(`===================================================================`);
    console.log(`Cohort.findOrCreate(dbModel.connection,new Cohort("cohort_name"))`);
    console.log(`Cohort.update(dbModel.connection,id_cohort,new Cohort("new_cohort_name",id_selected))`);
    console.log(`Cohort.remove(dbModel.connection,id_to_be_removed)`);
    console.log(`Cohort.findAll(dbModel.connection,[callback function]`);
    console.log(`Cohort.where(dbModel.connection,"statment_to_match",[callback function]`);
    console.log(`===================================================================`);
  }

}

export default Cohort

// Cohort.create(dbModel.connection, new Cohort("Coba Fox"))
// Cohort.create(dbModel.connection, new Cohort("Berbagi Fox"))
// Cohort.update(dbModel.connection, new Cohort("Bland Fox",1))
// Cohort.remove(dbModel.connection, 6)
// Cohort.findById(dbModel.connection, 2)
// Cohort.findAll(dbModel.connection, function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})
// Cohort.where(dbModel.connection, "cohort_name = 'Blind Fox'", function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})

// data yang sudah ada
// Cohort.findOrCreate(dbModel.connection,new Student("Bland Fox"))

// Cohort.findAll(dbModel.connection, {limit : 2, offset: 1}, function(data, err) {
//   if(!err) {
//     for(var i=0; i<data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }})
