import Sidebar from '../../component/Sidebar/Sidebar';
import Topbar from '../../topbar/topbar';
import "./dashboard.css"
import React, { useState, useEffect, useRef } from 'react';


function Dashboard() {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <h1>Dashboard</h1>
      </div>

  );
}

export default Dashboard;