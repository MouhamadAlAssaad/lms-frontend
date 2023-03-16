import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./lms.svg"
import Sidebar from '../../component/Sidebar/Sidebar';
import './login.css';
import { useCookies } from 'react-cookie';
import background from "./loginwallpaper.jpg"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['name']);


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {

      console.log("Login response:", data);
      if (data.access_token) {
        setCookie("auth", JSON.stringify(data));
        setLoggedIn(true);
        navigate('/dashboard');
      }
    })
    .catch(error => console.error(error));  
  
  }

  return (

    <>
    <div>
      <img className='login-wallpaper' src={background}/>
      <div className='overlayy'></div>
      </div>
      {loggedIn ? (
        <Sidebar />
        
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="login-form">
              <img className='logo' src='https://thumbs.dreamstime.com/b/lms-letter-technology-logo-design-white-background-lms-creative-initials-letter-logo-concept-lms-letter-design-lms-letter-252935662.jpg' alt="Logo"  />
            <div className="form-page">
              <input type="email" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
              <input type="password" id="password" placeholder="password"value={password} onChange={(event) => setPassword(event.target.value)} required/>
              <div>
                <button  type="submit">login</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Login;






