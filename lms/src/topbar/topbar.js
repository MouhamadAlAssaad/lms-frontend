import  "./topbar.css";
import { HiOutlineLogout } from "react-icons/hi";
import profile from "./adminprofile.png";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Topbar() {
  const authCookie = Cookies.get("auth");
  let isSuper = false; 
  let name = "";
  if (!authCookie) {
  
  } else {
    try {
      const dataUser = JSON.parse(authCookie);
      const token = dataUser.access_token;
      name = dataUser.user.name;
    } catch (error) {
      console.error("Invalid auth cookie:", authCookie);
    }
  }
     
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
