import { useState } from "react";
import { useLocation, NavLink,Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "./lms.svg";
import calender from "./icons/calendar.png";
import logout from "./icons/logout.png";
import presentation from "./icons/presentation.png";
import report from "./icons/report.png";
import sections from "./icons/sections.png";
import student from "./icons/student.png";
import user from "./icons/user.png";


function Sidebar(props) {
  
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  
  if (useLocation().pathname == "/") return null; 
  return (
    <div className="sidebar">
      <img className="sidebar_image" src={logo} alt="Logo" />
      <nav>
        <NavLink
          to="/dashboard"
          className="sidebar-links"
          onClick={() => handleTabClick(5)}
        >
          <img className="sidebar_icons" src={report} alt="Logo" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admins"
          className="sidebar-links"
          onClick={() => handleTabClick(1)}
        >
          {" "}
          <img className="sidebar_icons" src={user} alt="Logo" />
          Admin
        </NavLink>
        <NavLink
          to="/students"
          className="sidebar-links"
          onClick={() => handleTabClick(1)}
        >
          <img className="sidebar_icons" src={student} alt="Logo" />
          Students
        </NavLink>
        <NavLink
          to="/classes"
          className="sidebar-links"
          onClick={() => handleTabClick(2)}
        >
          <img className="sidebar_icons" src={presentation} alt="Logo" />
          Class
        </NavLink>
        <NavLink
          to="/attendance"
          className="sidebar-links"
          onClick={() => handleTabClick(4)}
        >
          <img className="sidebar_icons" src={calender} alt="Logo" />
          Attendance
        </NavLink>
      </nav>
      <h3>
        <Link to="/" onClick={props.logout} className="logout ">
          <img className="sidebar_icons" src={logout} alt="Logo" />
          Logout
        </Link>
      </h3>
    </div>
  );
}
export default Sidebar;
