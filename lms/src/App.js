import { Route,Routes } from 'react-router-dom';
import './App.css';
import Admins from './pages/admins'
import Students from './pages/students'
import Classes from './pages/Class/classes'
import Sections from './pages/sections'
import Attendance from './pages/attendance'
import Reports from './pages/reports'
import Login from "./pages/login/login_page.js";
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/admins" element={<Admins/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/classes" element={<Classes/>}/>
            <Route path="/sections" element={<Sections/>}/>
            <Route path="/attendance" element={<Attendance/>}/>
            <Route path="/reports" element={<Reports/>}/>
          </Routes>
   
    </div>
  );
}

export default App;