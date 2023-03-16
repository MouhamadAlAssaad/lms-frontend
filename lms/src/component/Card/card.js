import React from 'react';
import './card.css'

const StudentCard = ({ numStudents }) => {
  return (
    <div className="card">
      <div className="card-header">
        Number of Students
      </div>
      <div className="card-body">
        <h2 className="card-title">{numStudents}</h2>
        <p className="card-text">Total number of students</p>
      </div>
    </div>
  );
}

const AdminCard = ({ numAdmins }) => {
  return (
    <div className="card">
      <div className="card-header">
        Number of Admins
      </div>
      <div className="card-body">
        <h2 className="card-title">{numAdmins}</h2>
        <p className="card-text">Total number of admins</p>
      </div>
    </div>
  );
}

export { StudentCard, AdminCard };

