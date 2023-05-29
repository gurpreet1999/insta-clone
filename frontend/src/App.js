
import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route ,useLocation, useFetcher} from "react-router-dom";
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
import VideoCallComponent from "./components/VideoCallComponent";
import CallingRecipient from "./components/CallingRecipient";
import CallNotification from "./components/CallNotification";
import { useDispatch, useSelector } from "react-redux";






function App() {




const {user}=useSelector(state=>state.auth)



 

 const [Offer,setOffer]=useState({})
  

  
  







  const [callingNotificationModal,SetcallingNotificationModal]=useState(false);
  
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
const location=useLocation()



console.log(location)






  return (
 
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          {/* {location.pathname.startsWith("/message" || "/reel") ?"":  <Navbar />
          } */}
        
          <Routes>
            <Route path="/" element={<Home SetcallingNotificationModal={SetcallingNotificationModal}  setOffer={setOffer} />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/reel" element={<Reel/>}></Route>
            <Route path="/message" element={<Message  />}></Route>
            <Route path="/createPost" element={<Createpost />}></Route>
            <Route path="/reel-create" element={<CreateReel />}></Route>
            <Route path="/profile/:userid" element={<UserProfie />}></Route>
            <Route path="/insta/videocall" element={<VideoCallComponent />}></Route>
            <Route path="/callingrecipient" element={<CallingRecipient />}></Route>
            <Route path="/modal" element={<CallNotification />}></Route>
           
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
          {callingNotificationModal && <CallNotification  Offer={Offer}  SetcallingNotificationModal={SetcallingNotificationModal}   callingNotificationModal={callingNotificationModal} ></CallNotification>}
   

        </LoginContext.Provider>
      </div>
    
  );
}

export default App;