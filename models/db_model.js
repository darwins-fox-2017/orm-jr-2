"use strict"
const sqlite3 = require('sqlite3').verbose();

class DBModel {

   constructor(filename){
      this._db = new sqlite3.Database(filename);
   }

   createTabel(){
     let db = this._db;
     let CREATE_TABEL_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL )"
     let CREATE_TABEL_STUDENT = "CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, cohorts_id INTEGER ,FOREIGN KEY(cohorts_id) REFERENCES cohorts(id))"
     db.serialize(function(){
       db.run(CREATE_TABEL_COHORTS,function(err){
         if (err) {
           console.log(err);
         } else {
           console.log('tabel created');
         }
       })

       db.run(CREATE_TABEL_STUDENT,function(err){
         if (err) {
           console.log(err);
         } else {
           console.log('tabel created');
         }
       })


     });

   }


}

export default DBModel
