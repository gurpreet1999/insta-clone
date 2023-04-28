import React, { useContext } from "react";
import logo from "../img/download.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useSelector } from "react-redux";
import { InstagramLogo } from "@phosphor-icons/react";

export default function Navbar() {

const {isLoggedIn,token,user}=useSelector(state=>state.auth)

  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    
    if (isLoggedIn || token) {
      return [
        <>
        <Link style={{ marginLeft: "20px" ,marginTop:"15px" }} to="/">
           Home
          </Link>
          <Link to={`/profile/${user._id}`}>
            <li>Profile</li>
          </Link>
          <Link style={{marginRight:"10px"}} to="/createPost">Create Post</Link>

          <Link style={{marginLeft:"12px"}}    to="/reel">Reel</Link>
          <Link style={{marginLeft:"12px"}}    to="/message">Message</Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li style={{marginTop:"15px"}}>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img className="img"   src={logo} alt="" />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}