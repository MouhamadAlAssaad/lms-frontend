import React, { PureComponent } from "react";
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
import classes from './chart.module.css'

const data = [
  {
    name: "January",
    Late: 4000,
    Present: 2400,
    Absent: 2400,
  },
  {
    name: "February",
    Late: 3000,
    Present: 1398,
    Absent: 2210,
  },
  {
    name: "March",
    Late: 2000,
    Present: 9800,
    Absent: 2290,
  },
  {
    name: "April",
    Late: 2780,
    Present: 3908,
    Absent: 2000,
  },
  {
    name: "May",
    Late: 1890,
    Present: 4800,
    Absent: 2181,
  },
  {
    name: "May",
    Late: 2390,
    Present: 3800,
    Absent: 2500,
  },
  {
    name: "June",
    Late: 3490,
    Present: 4300,
    Absent: 2100,
  },
  {
    name: "August",
    Late: 3490,
    Present: 4300,
    Absent: 2100,
  },
  {
    name: "September",
    Late: 3490,
    Present: 4300,
    Absent: 2700,
  },
  {
    name: "October",
    Late: 3491,
    Present: 4600,
    Absent: 2300,
  },
  {
    name: "November",
    Late: 3490,
    Present: 4300,
    Absent: 2100,
  },
  {
    name: "December",
    Late: 3490,
    Present: 4300,
    Absent: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  render() {
    return (
      <div className={classes.chart}>
      <ResponsiveContainer >
        <div>
          <LineChart
            width={1500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Present"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Late" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Absent" stroke="#DF2E38" />
          </LineChart>
        </div>
      </ResponsiveContainer>
      </div>
    );
  }
}