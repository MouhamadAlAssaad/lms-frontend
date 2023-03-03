import { Route,Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Dashboard/sidebar';
import Admins from './pages/admins'
import Students from './pages/students'
import Classes from './pages/classes'
import Sections from './pages/sections'
import Attendance from './pages/attendance'
import Reports from './pages/reports'


function App() {
  return (
    <div className="App">
      <Sidebar/>
          <Routes>
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
