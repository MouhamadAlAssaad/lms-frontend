import  "./topbar.css";
import { HiOutlineLogout } from "react-icons/hi";
import profile from "./adminprofile.png";
import { useLocation } from "react-router-dom";


function Topbar() {

  const style = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Assets/people.png"})`,
  };
  if (useLocation().pathname == "/") return null; 

  return (
    <div className="topbar">
      <div>
      
      </div>
      <div className="topbar-admin">
        <div>
            <img className="topbarimg"  src={profile}/>
        </div>
        <div className="topbar-end">
          <h4>Mouhamad Al Assaad</h4>
          <HiOutlineLogout size={30} className="topbar-logOut" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
