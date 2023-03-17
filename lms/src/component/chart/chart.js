// import React, { PureComponent } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import classes from './chart.module.css'
// function Chart(props){
// const data = [
//   {
//     name: "January",
//     Late: 4000,
//     Present: 2400,
//     Absent: 2400,
//   },
//   {
//     name: "February",
//     Late: 3000,
//     Present: 1398,
//     Absent: 2210,
//   },
//   {
//     name: "March",
//     Late: 2000,
//     Present: 9800,
//     Absent: 2290,
//   },
//   {
//     name: "April",
//     Late: 2780,
//     Present: 3908,
//     Absent: 2000,
//   },
//   {
//     name: "May",
//     Late: 1890,
//     Present: 4800,
//     Absent: 2181,
//   },
//   {
//     name: "May",
//     Late: 2390,
//     Present: 3800,
//     Absent: 2500,
//   },
//   {
//     name: "June",
//     Late: 3490,
//     Present: 4300,
//     Absent: 2100,
//   },
//   {
//     name: "August",
//     Late: 3490,
//     Present: 4300,
//     Absent: 2100,
//   },
//   {
//     name: "September",
//     Late: 3490,
//     Present: 4300,
//     Absent: 2700,
//   },
//   {
//     name: "October",
//     Late: 3491,
//     Present: 4600,
//     Absent: 2300,
//   },
//   {
//     name: "November",
//     Late: 3490,
//     Present: 4300,
//     Absent: 2100,
//   },
//   {
//     name: "December",
//     Late: 3490,
//     Present: 4300,
//     Absent: 2100,
//   },
// ];
// }
//  class Example extends PureComponent {
//   static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

//   render() {
//     return (
//       <div className={classes.chart}>
//       <ResponsiveContainer >
//         <div>
//           <LineChart
//             width={1350}
//             height={500}
//             // data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="Present"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//             <Line type="monotone" dataKey="Late" stroke="#82ca9d" />
//             <Line type="monotone" dataKey="Absent" stroke="#DF2E38" />
//           </LineChart>
//         </div>
//       </ResponsiveContainer>
//       </div>
//     );
//   }
//   // return <Example />;
// }
// export default Chart;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classes from './chart.module.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function Chart() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(()=>{
    const token = Cookies.get("auth");
    axios
      .get("http://localhost:8000/api/auth/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data); 
        setAttendanceData(response.data.message); // update state with the entire response data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const year = 2023; 
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2023, i, 1);
    return date.toLocaleString('default', { month: 'long' });
  });
  
  const monthlyAttendance = [];

  months.forEach((month) => {
    // filter the attendance data based on the year and month
    const filteredAttendance = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() === year && recordDate.toLocaleString('default', { month: 'long' }) === month;
    });

    // count the number of records
    const presentCount = filteredAttendance.filter((record) => record.case === 'present').length;
    const lateCount = filteredAttendance.filter((record) => record.case === 'late').length;
    const absentCount = filteredAttendance.filter((record) => record.case === 'absent').length;

    // add the attendance data to the monthlyAttendance array
    monthlyAttendance.push({
      name: month,
      Present: presentCount,
      Late: lateCount,
      Absent: absentCount,
    });
  });

  
  console.log(monthlyAttendance);

  return (
    <div className={classes.chart}>
    <ResponsiveContainer width="100%" height={400}  
  >
      <LineChart data={monthlyAttendance} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Late" stroke="#8884d8" />
        <Line type="monotone" dataKey="Present" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Absent" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
     </div>
  );
 
}

export default Chart;
