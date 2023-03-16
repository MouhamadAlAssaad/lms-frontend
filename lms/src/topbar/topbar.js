import  "./topbar.css";
import { HiOutlineLogout } from "react-icons/hi";
import profile from "./adminprofile.png";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Topbar() {
    const dataUser = JSON.parse(Cookies.get("auth"));
    const name = dataUser.user.name;
  const style = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Assets/people.png"})`,
  };
  if (useLocation().pathname == "/") return null; 

  return (
    <div className="topbar">
        <div className="topbar-admin">
          <h4>{name}</h4>
      </div>
    </div>
  );
}

export default Topbar;
