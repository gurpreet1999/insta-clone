import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getPhoto, getSender, getSenderId } from "./chatLogic";
import { useSelector } from "react-redux";
import "./CallingRecipient.css";
import {
  Microphone,
  PhoneDisconnect,
  Screencast,
  Video,
  VideoCamera,
} from "@phosphor-icons/react";
import Peer from "./Peer";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { connectSocket, socket } from "../socket";
import ReactPlayer from "react-player";

const CallingRecipient = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  
 
  const callButtonRef=useRef()
  


  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();


  // useEffect(()=>{

  //   if(remoteSocketId){
      
  //   callButtonRef.current.click()
  //   }
  // },[remoteSocketId])

  const handleUserJoined = useCallback(({ id }) => {
    
    console.log("user joined")
    setRemoteSocketId(id);
     }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await Peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await Peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      Peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ ans }) => {
      Peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    console.log("hellob hnsbdbjndj")
    const offer = await Peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    
    async ({ from, offer }) => {
      console.log("incomingnegitiation")
      const ans = await Peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await Peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    Peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <div className="cardWrapper">
      <div className="remoteVideo">
        {" "}
        <ReactPlayer
          playing
          muted
          height="100%"
          width="100%"
          url={remoteStream}
        />{" "}
      </div>

      <div className="CprofileBox">
        <div className="Cprofilepic">
          <img
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "50px", objectFit: "cover" }}
            src={getPhoto(user, selectedChat.participants)}
          ></img>
        </div>
        <div className="CprofileName">
          {getSender(user, selectedChat.participants)}
        </div>

        <div className="calling">Calling...</div>
      </div>

      <div className="CsenderVideoFunction">
        <div className="iconOfVideoCall">
          <Screencast color="white" weight="fill" size={24} />
        </div>
        <div className="iconOfVideoCall">
          <VideoCamera color="white" weight="fill" size={24} />
        </div>
        <div className="iconOfVideoCall">
          <Microphone color="white" weight="fill" size={24} />
        </div>
        <div
          className="iconOfVideoCall"
          style={{ background: "rgb(255 79 79)" }}
        >
          <PhoneDisconnect color="white" weight="fill" size={24} />
        </div>
      </div>

      <div className="localVideoOfsender">
        <ReactPlayer
          playing
          muted
          height="100%"
          width="200%"
          url={myStream}
        />
      </div>

      {myStream && <button onClick={sendStreams}>Send Stream</button>}
       <button ref={callButtonRef} onClick={handleCallUser}  >CALL</button>
    </div>
  );
};

export default CallingRecipient;
