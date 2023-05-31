import React, { useCallback, useContext, useEffect, useState } from "react";
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
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const Offer = location.state;
  console.log(Offer.offer);

  useEffect(() => {
    connectSocket(user._id);
  }, [user]);

  const [myStream, setMyStream] = useState("");
  const [remoteStream, setRemoteStream] = useState("");
 // if(!myStream.getTracks){
    //   const setting=myStream.getTracks()[0].getSettings()
    //   console.log(setting)
    // }else{
    //   console.log("hi")
    //   for (const track of myStream.getTracks()) {
    //     Peer.peer.addTrack(track, myStream);
    //   }
    // }
  const sendStreams = useCallback(() => {

    console.log(myStream)
   
    
  }, [myStream]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await Peer.getOffer();
    const recieverId = getSenderId(user, selectedChat.participants);
    socket.emit("user:call", {
      to: recieverId,
      offer,
      from: user._id,
      chatId: selectedChat._id,
    });


console.log(stream)
    setMyStream(stream);
  }, [socket]);

  useEffect(() => {
    if (!Offer.offer) {
      handleCallUser();
    }
  }, [socket]);

  const handleCallAccepted = useCallback(({ from, ans }) => {
    console.log(myStream)
    console.log(ans)
    Peer.setLocalDescription(ans);
    console.log("Call Accepted!");
    sendStreams();
  }, []);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await Peer.getOffer();
    const recieverId = getSenderId(user, selectedChat.participants);
    socket.emit("peer:nego:needed", { offer, to: recieverId, from: user._id });
  }, [ socket]);

  // useEffect(() => {
  //   Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
  //   return () => {
  //     Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
  //   };
  // }, [handleNegoNeeded]);

  // const handleNegoNeedIncomming = useCallback(
  //   async ({ from, offer }) => {
  //     const ans = await Peer.getAnswer(offer);
  //     socket.emit("peer:nego:done", { to: from, ans, from: user._id });
  //   },
  //   [socket]
  // );

  // const handleNegoNeedFinal = useCallback(async ({ ans }) => {
  //   await Peer.setLocalDescription(ans);
  // }, []);

  useEffect(() => {
    Peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      console.log(remoteStream[0])
      setRemoteStream(remoteStream[0]);
    });
  }, []);



  useEffect(() => {
    socket.on("call:accepted", handleCallAccepted);
    // socket.on("peer:nego:needed", handleNegoNeedIncomming);
    // socket.on("peer:nego:final", handleNegoNeedFinal);
  });

  const handleIncommingCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
console.log(stream);
    console.log(`Incoming Call`, Offer.offer.offer);
    const ans = await Peer.getAnswer(Offer.offer.offer);

    socket.emit("call:accepted", { to: Offer.offer.from, ans, from: user._id });
    setMyStream(stream);
  }, [socket]);

  useEffect(() => {
    if (Offer.offer) {
      handleIncommingCall();
    }
  }, []);

  return (
    <div className="cardWrapper">
      <div className="remoteVideo">
        {" "}
        <ReactPlayer
          playing
          muted
          height="100px"
          width="200px"
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
          height="100px"
          width="200px"
          url={myStream}
        />
      </div>
    </div>
  );
};

export default CallingRecipient;
