import "./dashboard.css"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from "../../component/chart/chart"
import Roundchart from "../../component/roundchart/rounchart";
import { StudentCard, AdminCard } from "../../component/Card/card"
function Dashboard() {
  const dataUser = JSON.parse(Cookies.get("auth"));
      const token = dataUser.access_token;
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
 const [attendanceData,setattendanceData]=useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/auth/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data); 
          setData(response.data.message); 
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    // calculate the percentages when data changes
    const numPresent = data.filter((item) => item.case === "present").length;
    const numAbsent = data.filter((item) => item.case === "absent").length;
    const numLate = data.filter((item) => item.case === "late").length;
    const total = numPresent + numAbsent + numLate;
    const percentPresent = Math.round((numPresent / total) * 100);
    const percentAbsent = Math.round((numAbsent / total) * 100);
    const percentLate = Math.round((numLate / total) * 100);
   
    useEffect(() => {
      axios.get('http://localhost:8000/api/auth/student',{
        headers: { Authorization: `Bearer ${token}` },
      }) // replace with your actual API endpoint
      .then((response) => {
        console.log(response.data);
        setStudents(response.data.message); // set the attendance records to state
      })
        .catch(error => console.log(error));
      
    }, []);
  
    const numStudents = students.length;
    const [Admins, setAdmins] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8000/api/auth/users',{
        headers: { Authorization: `Bearer ${token}` },
      }) 
      .then((response) => {
        console.log(response.data);
        setAdmins(response.data.users); 
      })
        .catch(error => console.log(error));
      
    }, []);
    
    const numAdmins = Admins.length;
    
// useEffect(()=>{
//   const token = Cookies.get("auth");
//   axios
//     .get("http://localhost:8000/api/auth/attendance", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       console.log(response.data); 
//       setattendanceData(response.data.message); 
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);
// // assuming your attendance data is stored in a variable named 'attendanceData'
// const year = 2023; // or whatever year you want to get attendance for
// const months = Array.from({ length: 12 }, (_, i) => i + 1); // generate an array of numbers from 1 to 12
// const monthlyAttendance = [];

// months.forEach((month) => {
//   // filter the attendance data based on the year and month
//   const filteredAttendance = attendanceData.filter((record) => {
//     const recordDate = new Date(record.date);
//     return recordDate.getFullYear() === year && recordDate.getMonth() + 1 === month;
//   });

//   // add the filtered attendance data to the monthlyAttendance array
//   monthlyAttendance.push(filteredAttendance);
// });

// // now the monthlyAttendance array contains attendance data for each month of the year
// console.log(monthlyAttendance);

  return (
    <div>
<div className="content">
  <div className="pakage">
<Roundchart  percentPresent={percentPresent} percentAbsent={percentAbsent} percentLate={percentLate}/>
</div>
<div className="paKage">
<StudentCard numStudents={numStudents} />
</div>
<div className="pakage down">
<AdminCard numAdmins={numAdmins} />
</div>
</div>
<Chart />
      
    </div>
  );
}


export default Dashboard;