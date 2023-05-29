import React, { useContext, useEffect, useState } from 'react'
import { getPhoto, getSender, getSenderId } from './chatLogic'
import { useSelector } from 'react-redux'
import "./CallingRecipient.css"
import { Microphone, PhoneDisconnect, Screencast, Video, VideoCamera } from '@phosphor-icons/react'
import Peer from './Peer'
import { useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

const CallingRecipient = () => {

  const socket=useContext(SocketContext)

  
    const {selectedChat}=useSelector(state=>state.chat)
    const {token,user}=useSelector(state=>state.auth)
    const [myStream, setMyStream] = useState("");
  const [remoteStream, setRemoteStream] = useState("");

useEffect(async()=>{
  // const stream = await navigator.mediaDevices.getUserMedia({
  //   audio: true,
  //   video: true,
  // });
  const offer = await Peer.getOffer();
  const recieverId=getSenderId(user,selectedChat.participants)
  socket.emit("user:call", { to:recieverId, offer,from:user._id});
  // setMyStream(stream);
},[socket])



  return (
    <div className='cardWrapper'  >
        <div className='CprofileBox'>
<div className='Cprofilepic' >
<img width={"100%"} height={"100%"} style={{borderRadius:"50px" , objectFit:"cover"}}   src={getPhoto(user,selectedChat.participants)} ></img>
</div>
<div className='CprofileName' >
{
   getSender(user,selectedChat.participants)
}
</div>

<div className='calling' >Calling...</div>

</div>

<div className='CsenderVideoFunction' >

<div  className='iconOfVideoCall'    ><Screencast color="white"   weight="fill"     size={24} /></div>
<div  className='iconOfVideoCall'  ><VideoCamera color="white"  weight="fill"   size={24} /></div>
<div   className='iconOfVideoCall' ><Microphone color="white"  weight="fill"  size={24} /></div>
<div  className='iconOfVideoCall' style={{background:"rgb(255 79 79)"}}    ><PhoneDisconnect  color="white"  weight="fill"   size={24} /></div>


</div>


<div className='localVideoOfsender'  >
<video   src=''  style={{width:"100%",height:"100%",objectFit:"cover"}}  ></video>
</div>


    </div>



  )
}

export default CallingRecipient