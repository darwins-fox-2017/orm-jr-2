"use strict"
var faker = require('faker');

class Student {
  constructor(firstName, lastName, cohortId){
    this.firstName = firstName,
    this.lastName = lastName,
    this.cohortId = cohortId
  }

  static addStudent(db, student){
    let ADD_STUDENT_QUERY =   `INSERT INTO students (first_name, last_name, cohort_id) VALUES (?, ?, ?)`
    db.run(ADD_STUDENT_QUERY, [student.firstName, student.lastName, student.cohortId], function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`${student.firstName} added to the database`);
        return true
      }
    })
  }

  static findOrCreate(db, student){
    let ADD_STUDENT_QUERY =   `INSERT INTO students (first_name, last_name, cohort_id) VALUES (?, ?, ?)`
    let FIND_ALL_STUDENT_QUERY = `SELECT * FROM students WHERE first_name = "${student.firstName}" AND last_name = "${student.lastName}" AND cohort_id = "${student.cohortId}"`

    db.all(FIND_ALL_STUDENT_QUERY, function(err, row){
      if (err) {
        console.log(err);
      } else {
        if (row.length == 0) {
          db.run(ADD_STUDENT_QUERY, [student.firstName, student.lastName, student.cohortId], function(err){
            if (err) {
              console.log(err);
            } else {
              console.log(`${student.firstName} was added to our database`);
            }
          })
        } else {
          console.log(`This student already exist`);
          console.log(row);
        }
      }
    })
  }

  static showAllStudent(db){
    let SHOW_ALL_STUDENT_QUERY = `SELECT students.*, cohorts.name FROM students LEFT JOIN cohorts ON students.cohort_id = cohorts.id`
    db.each(SHOW_ALL_STUDENT_QUERY, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static findAll(db, paggination){
    let SHOW_ALL_STUDENT_WITH_PAGINATION_QUERY = `SELECT students.*, cohorts.name FROM students LEFT JOIN cohorts ON students.cohort_id = cohorts.id LIMIT ${paggination.limit} OFFSET ${paggination.offset}`
    db.each(SHOW_ALL_STUDENT_WITH_PAGINATION_QUERY, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static findStudent(db, fieldName, value){
    let SHOW_ALL_STUDENT_BY = `SELECT * FROM students WHERE ${fieldName} = (?)`
    db.each(SHOW_ALL_STUDENT_BY, [value], function(err, row){
      console.log(fieldName, value);
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static removeStudent(db, id){
    let DELETE_STUDENT_QUERY = `DELETE FROM students WHERE id = ${id}`
    db.run(DELETE_STUDENT_QUERY, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Student with id : ${id} was removed!`);
      }
    })
  }

  static updateStudent(db, studentId, fieldName, newValue){
    let UPDATE_STUDENT_QUERY = `UPDATE students SET ${fieldName} = (?) WHERE id = ${studentId}`
    db.run(UPDATE_STUDENT_QUERY, [newValue], function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Data on field ${fieldName} was changed with new value ${newValue}!`);
      }
    })
  }

  static generateFakeStudentData(db, totalNumber){
    for (let i = 0; i < totalNumber; i++) {
      let student = {}
      student.firstName = faker.name.firstName();
      student.lastName = faker.name.lastName();
      student.cohortId = Math.floor(Math.random() * 6) + 1
      Student.addStudent(db, student)
    }
  }

  static help(){
    console.log('--------- what we can help ? --------------');
    // Student
    console.log(`Add student : type addStudent(db, new Student(firstName, lastName, cohortId))`);
    console.log(`Show All student : type showAllStudent(db)`);
    console.log(`Update student data : type updateStudent(db, studentId, fieldName, newValue)`);
    console.log(`Remove a student : type removeStudent(db, id)`);
    console.log(`Find all student with Paggination : findAll(db, paggination)`);
    console.log(`Find student by ? : findStudent(db, fieldName, value)`);
    console.log(`Find or Create student : findOrCreate(db, new Student(firstName, lastName, cohortId))`);
    console.log('----------------------------------------------');
    // Cohort
    console.log(`Show All cohorts : type showAllCohort(db)`);
    console.log(`Add a cohort : type addCohort(db, cohortName)`);
    console.log(`Remove a cohort : type removeCohort(db, id)`);
    console.log('----------------------------------------------');
    // Faker
    console.log(`Generate fake student data : generateFakeStudentData(db, totalNumber)`);
    console.log(`Generate fake cohort data : generateFakeCohortData(db, totalNumber)`);
    // Testing
    console.log(`You can test the function by typing : testing()`);
  }

}

export default Student
