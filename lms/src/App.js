import { Route,Routes } from 'react-router-dom';
import './App.css';
import Admins from './pages/admin/admins'
import Students from './pages/students/students'
import Classes from './pages/Class/classes'
import Sections from './pages/sections/sections'
import Attendance from './pages/attendance/attendance'
import Login from "./pages/login/login_page.js";
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div >
      
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/admins" element={<Admins/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/classes" element={<Classes/>}/>
            <Route path="/sections" element={<Sections/>}/>
            <Route path="/attendance" element={<Attendance/>}/>
          </Routes>
   
    </div>
  );
}

export default App;