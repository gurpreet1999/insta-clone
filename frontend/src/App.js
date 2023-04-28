
import React, { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route ,useLocation} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./components/Createpost";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import UserProfie from "./components/UserProfile";
import Reel from "./components/Reel";
import Message from "./components/Message";
import CreateReel from "./components/CreateReel";



function App() {

const location=useLocation()

console.log(location)

  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
 
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          {location.pathname.startsWith("/reel" || "/message") ?"":  <Navbar />
          }
        
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/reel" element={<Reel/>}></Route>
            <Route path="/message" element={<Message/>}></Route>
            <Route path="/createPost" element={<Createpost />}></Route>
            <Route path="/reel-create" element={<CreateReel />}></Route>
            <Route path="/profile/:userid" element={<UserProfie />}></Route>
           
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    
  );
}

export default App;