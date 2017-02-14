"use strict"

class Student {
    constructor(first_name, last_name, cohors_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.cohors_id = cohors_id;
    }

    static addstudent(db, student){
      let ADD_STUDENT_QUERY = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES(?,?,?)`
      db.run(ADD_STUDENT_QUERY,[student.first_name,student.last_name,student.cohors_id], function(err){
        if(err){
          console.log(err);
        }else{
          console.log('add data success');
        }
      })
    }

    static findAddStudent(db, student){
      let ADD_STUDENT_QUERY = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES(?,?,?)`
      let FIND_STUDENT_QUERY = `SELECT * FROM students where first_name = "${student.first_name}" AND last_name = "${student.last_name}" AND cohorts_id = ${student.cohors_id}`
      db.all(FIND_STUDENT_QUERY,function(err,row){
        if (err) {
          console.log(err);
        } else {
          if (row.length==0){
             db.run(ADD_STUDENT_QUERY,[student.first_name,student.last_name,student.cohors_id], function(err){
               if (err) {
                 console.log(err);
               } else {
                 console.log('add data berhasil');
               }
             });
           }else {
             console.log(row);
           }

        }
      })
    }

    static update(db,field,value,id){
      let UPDATE_STUDENT_QUERY = `UPDATE students SET ${field} = (?) where students.id = ${id}`
      db.run(UPDATE_STUDENT_QUERY,[value], function(err){
        if(err){
          console.log(err);
        }else{
          console.log('change data success');
        }
      })
    }

    static remove(db,id){
      let REMOVE_STUDENT_QUERY = `DELETE FROM students  WHERE students.id = ${id}`
      db.run(REMOVE_STUDENT_QUERY, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('remove data success');
        }
      })
    }

    static findById(db,id){
      let FINDBYID_STUDENT_QUERY = `SELECT students.*,cohorts.name FROM students left join cohorts on students.cohorts_id = cohorts.id where students.id= ${id} `
      db.each(FINDBYID_STUDENT_QUERY,function(err,row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    }

    static findAllLimitOffset(db,limitOfsite){
     console.log(limitOfsite.limit,limitOfsite.offset);
      let FINDALL_STUDENT_QUERY = `SELECT students.*,cohorts.name FROM students left join cohorts on students.cohorts_id = cohorts.id LIMIT ${limitOfsite.limit} OFFSET ${limitOfset.offsite}`
      db.each(FINDALL_STUDENT_QUERY,function(err,row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    }

    static findAll(db){
      let FINDALL_STUDENT_QUERY = `SELECT students.*,cohorts.name FROM students left join cohorts on students.cohorts_id = cohorts.id `
      db.each(FINDALL_STUDENT_QUERY,function(err,row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    }


    static findBy(db,kondition){
       kondition = kondition.match(/[^\s=]+/g);
      let field = kondition[0];
      let value = kondition[1];
      let FINDBY_STUDENT_QUERY = `SELECT students.*,cohorts.name FROM students left join cohorts on students.cohorts_id = cohorts.id WHERE ${field} =(?) `
      db.each(FINDBY_STUDENT_QUERY,value,function(err,row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    }


    static help(){
      console.log('--------what we can  do----------');
      console.log('add new record : addstudent(db,new Student(first_name,last_name,Cohort_id))');
      console.log('update record : update(db,field,value,id)');
      console.log('remove record : remove(db,id)');
      console.log('find by id : findbyid(db,id)');
      console.log('find all : findall(db)');
      console.log('find by : findby(db,condition(field=value))');
      console.log('add cohort : addcohort(db,cohortname)');
      console.log('remove cohort : removecohort(db,cohortname)');
      console.log('see cohort : seecohort(db)');
      console.log('see all with limit : findalllimit(db,{limit:value,offset:value})');
      console.log('find and insert : findandinsert(db,new Student{first_name,last_name,cohort_id})');
      console.log('help : help()');
    }


}

export default Student
