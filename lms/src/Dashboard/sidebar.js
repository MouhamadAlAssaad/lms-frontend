import { useState } from "react";
import {  useLocation , NavLink} from "react-router-dom";
import "./sidebar.css"
import logo from "./lms.svg"

function Sidebar(props) {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="sidebar">
    <img className="sidebar_image" src={logo} alt="Logo" />
      <nav>
        <NavLink
          to="/admins"
          className={location.pathname === "/admins" ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          Admin
        </NavLink>
        <NavLink
          to="/students"
          className={location.pathname === "/students" ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          Students
        </NavLink>
        <NavLink
          to="/classes"
          className={location.pathname === "/classes" ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          Class
        </NavLink>
        <NavLink
          to="/sections"
          className={location.pathname === "/sections" ? "active" : ""}
          onClick={() => handleTabClick(3)}
        >
          Section
        </NavLink>
        <NavLink
          to="/attendance"
          className={location.pathname === "/attendance" ? "active" : ""}
          onClick={() => handleTabClick(4)}
        >
          Attendance
        </NavLink>
        <NavLink
          to="/reports"
          className={location.pathname === "/reports" ? "active" : ""}
          onClick={() => handleTabClick(5)}
        >
          Report
        </NavLink>
        
      </nav>
      <h3>
        <NavLink to="#" onClick={props.logout} className="logout">
          Logout
        </NavLink>
      </h3>
    </div>
  );
}

export default Sidebar;
