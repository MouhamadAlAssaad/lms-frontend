import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./lms.svg";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./login.css";
import { useCookies } from "react-cookie";
import background from "./loginwallpaper.jpg";
import LoginLogo from "./lms1.png";
// import TestSideBar from "../../component/SideBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["name"]);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response:", data);
        if (data.access_token) {
          setCookie("auth", JSON.stringify(data));
          setLoggedIn(true);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid email or password");
      });
  };
  
  
  return (
    // <>
    // <div>
    //   <img className='login-wallpaper' src={background}/>
    //   <div className='overlayy'></div>
    //   </div>
    //   {loggedIn ? (
    //     <Sidebar />

    //   ) : (
    //     <form onSubmit={handleSubmit}>
    //       <div className="login-form">
    //           <img className='logo' src={LoginLogo} alt="Logo"  />
    //         <div className="form-page">
    //           <input type="email" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
    //           <input type="password" id="password" placeholder="password"value={password} onChange={(event) => setPassword(event.target.value)} required/>
    //           <div>
    //             <button  type="submit">login</button>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   )}
    // </>

    <div className="login-page">
      <div className="login-container">
        <div className="login-page-logo">
          <img src={LoginLogo} width="100%" height="100%" />
        </div>
        {loggedIn ? (
          <Sidebar />
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
             {error && <div className="error">{error}</div>}
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
