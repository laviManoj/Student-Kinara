const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/students', (req, res) => {
  // Read the student data from the JSON file
  const studentData = JSON.parse(fs.readFileSync('student_data.json'));

  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Extract the relevant student details for the current page
  const students = studentData.slice(startIndex, endIndex);
  console.log("🚀 ~ file: students.js:53 ~ app.get ~ ̥:",students)


  // Return the paginated student data
  res.json({
    totalStudents: studentData.length,
    students
  });
});


//filters all student data and student details

app.get('/students/filter', (req, res) => {
    // Read the student data from the JSON file
    const studentData = JSON.parse(fs.readFileSync('student_data.json'));
  
    // Get the filter criteria from the query parameters
    const filterCriteria = req.query.filterCriteria;
  
    // Apply the filter criteria to the student data
    const filteredStudents = studentData.filter(student => {
      // Filter based on the required conditions
      return student.name.toLowerCase().includes(filterCriteria.toLowerCase());
    });
  
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    // Calculate the start and end indices for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    // Extract the relevant filtered student details for the current page
    const students= filteredStudents.slice(startIndex, endIndex);
    console.log("🚀 ~ file: students.js:53 ~ app.get ~ ̥:",students)
  
    // Return the paginated and filtered student data
    res.json({
      totalStudents: filteredStudents.length,
      students
    });
  });
  

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
