import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css";
import Admins from "./pages/admin/admins";
import Students from "./pages/students/students";
import Classes from "./pages/Class/classes";
import Sections from "./pages/sections/sections";
import Attendance from "./pages/attendance/attendance";
import Login from "./pages/login/login_page.js";
import Dashboard from "./pages/dashboard/dashboard";
import Sidebar from "./component/Sidebar/Sidebar";
import Topbar from "./topbar/topbar";
import PrivateRoutes from './utils/PrivateRoute';
import { useCookies } from 'react-cookie';

function App() {
  // const [cookies] = useCookies(['auth']);
  // const isAuthenticated = !!cookies.auth;
  // console.log(cookies.auth)

  return (
    <div className="App">
      <div className="App-sidebar">
        <Sidebar />
        <Topbar />
      </div>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
