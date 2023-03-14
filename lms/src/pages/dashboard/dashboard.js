import "./dashboard.css"
import React, { useState, useEffect, useRef } from 'react';
import Chart from "../../component/chart/chart"
import Roundchart from "../../component/roundchart/rounchart"
function Dashboard() {
  return (
    <div className="dashboard">
      <Roundchart/>
      <Chart/>

      </div>

  );
}

export default Dashboard;