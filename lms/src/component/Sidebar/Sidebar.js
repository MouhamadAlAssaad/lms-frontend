import { useState } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "./lms.svg";
import calender from "./icons/calendar.png";
import out from "./icons/logout.png";
import presentation from "./icons/presentation.png";
import report from "./icons/report.png";
import sections from "./icons/sections.png";
import student from "./icons/student.png";
import user from "./icons/user.png";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { FaConfluence} from "react-icons/fa"


function Sidebar(props) {
    const [isOpen, setIsOpen] = useState(true);
  const authCookie = Cookies.get("auth");
  let isSuper = false; 

 function handleClick() {
   const sidebar = document.querySelector(".sidebar");
   sidebar.classList.toggle("minimized");
 }
  if (!authCookie) {
  
  } else {
    try {
      const dataUser = JSON.parse(authCookie);
      const token = dataUser.access_token;
      isSuper = dataUser.user.is_super; // assign value
      // rest of the code
    } catch (error) {
      console.error("Invalid auth cookie:", authCookie);
    }
  }
  // rest of the code


  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const logout = () => {
    removeCookie("auth");
  };

  if (useLocation().pathname == "/") return null;
  return (
    <div className="sidebar">
      <img className="sidebar_image" src={logo} alt="Logo" />
      <nav className="nav-link">
        <NavLink
          to="/dashboard"
          class="sidebar-links"
          onClick={() => handleTabClick(5)}
        >
          <img class="sidebar_icons" src={report} alt="Logo" />
          <span>Dashboard</span>
        </NavLink>
        {isSuper ? (
          <NavLink
            to="/admins"
            class="sidebar-links"
            onClick={() => handleTabClick(1)}
          >
            {" "}
            <img class="sidebar_icons" src={user} alt="Logo" />
            <span>Admin</span>
          </NavLink>
        ) : null}

        <NavLink
          to="/students"
          class="sidebar-links"
          onClick={() => handleTabClick(1)}
        >
          <img class="sidebar_icons" src={student} alt="Logo" />
          <span>Students</span>
        </NavLink>
        <NavLink
          to="/classes"
          class="sidebar-links"
          onClick={() => handleTabClick(2)}
        >
          <img class="sidebar_icons" src={presentation} alt="Logo" />
          <span>Class</span>
        </NavLink>
        <NavLink
          to="/attendance"
          class="sidebar-links"
          onClick={() => handleTabClick(4)}
        >
          <img class="sidebar_icons" src={calender} alt="Logo" />
          <span>Attendance</span>
        </NavLink>
        <Link to="/" onClick={logout} className="sidbar-links">
          <img className="sidebar_icons" src={out} alt="Logo" />
          <span>logout</span>
        </Link>
      </nav>
      <h3 className="toggle" onClick={handleClick}>
        
          
          <FaConfluence />

      </h3>
    </div>
  );
}
export default Sidebar;
