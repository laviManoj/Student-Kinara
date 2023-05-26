import React, { useState, useEffect } from 'react';
import './styles.css';

// Rest of the code


const StudentGrid = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="student-grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Total Marks</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.totalMarks}</td>
            {/* Render additional columns */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentGrid;
