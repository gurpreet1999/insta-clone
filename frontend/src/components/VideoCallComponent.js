import React, { useContext, useEffect, useRef } from 'react'
import "./VideoCallComponent.css"
import { Gear, Microphone, SpeakerLow, VideoCamera } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'
import { getPhoto,getSender, getSenderId} from "./chatLogic";
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { connectSocket, socket } from "../socket";


const VideoCallComponent = () => {


  const {token,user}=useSelector(state=>state.auth)
  useEffect(() => {
    connectSocket(user._id);
  }, [user]);

  const navigate=useNavigate()
 

  const location=useLocation()
 const offer=location.state?.Offer


  const callUser=()=>{
    
    const recieverId = getSenderId(user, selectedChat.participants);
    socket.emit("room:join", {
      to: recieverId,
      from: user._id,
      room:1
     
    });

      navigate("/callingrecipient")

    


  }

  const acceptCall=()=>{
    console.log(offer)
    socket.emit("room:join2", {
   
      to:offer.from,
      from: user._id,
      room:offer.room
     
    });

    navigate("/callingrecipient")

  }
 

    
  const {selectedChat}=useSelector(state=>state.chat)


    let cameraStream;
    let videoRef=useRef()

// useEffect(async()=>{

//      cameraStream= await navigator.mediaDevices.getUserMedia({video:{
//         width: { ideal: 1280 },
//         height: { ideal: 1024 },
//         facingMode: "user"
//     }})
//     videoRef.current.srcObject=cameraStream
//     videoRef.current.setAttribute("autoplay",true)

//     console.log(videoRef.current)





// },[navigate])

const muteVideo=()=>{

cameraStream.getVideoTracks()[0].enabled=false

}

const unMuteVideo=()=>{
    cameraStream.getVideoTracks()[0].enabled=true
}



  return (
    <div className="cardWrapper">
 
           <div className='videoCallCard' >


<div className='localVideoCard'>
<div className='senderVideo'  >
<video ref={videoRef}  src=''  style={{width:"100%",height:"100%",objectFit:"cover"}}  ></video>
</div>
<div className='senderVideoFunction' >

<div  className='iconOfVideoCall'    ><VideoCamera color="white"   weight="fill"  onClick={unMuteVideo}   size={24} /></div>
<div  className='iconOfVideoCall'  ><Microphone color="white"  weight="fill"   size={24} /></div>
<div   className='iconOfVideoCall' ><SpeakerLow color="white"  weight="fill"  size={24} /></div>
<div  className='iconOfVideoCall'  ><Gear  color="white"  weight="fill"   size={24} /></div>


</div>




</div>
<div className='callingRecipient'>

<div  className='recipientDetailBox'>

<div className='profileBox'>
<div className='profilepic' >
<img width={"100%"} height={"100%"} style={{borderRadius:"50px" , objectFit:"cover"}}   src={getPhoto(user,selectedChat.participants)} ></img>
</div>
<div className='profileName' >
{
   getSender(user,selectedChat.participants)
}
</div>
</div>
<p className='readyToCall'  >{offer?"Ready to join?":"Ready to call?"}</p>
<div className='callButton'>
  
    {!offer?<button className='startCall' onClick={()=>{callUser()}}   >start call</button>: <button className='startCall' onClick={()=>{acceptCall()}}   >join call</button>}
</div>
</div>



</div>


           </div>

       
        </div>
  )
}

export default VideoCallComponent


