import React from 'react'

import "./CallNotification.css"
import { RiCloseLine } from 'react-icons/ri';
import { VideoCamera, X } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { selectTheChat } from '../redux/slice/chatSlice';

const CallNotification = ({SetcallingNotificationModal,Offer}) => {

const navigate=useNavigate()

  return (
    <div className="darkBg">
      <div className="centered">
        <div className="modal">
        
        <div className='CprofileBox'>
<div className='Cprofilepic' >
<img width={"100%"} height={"100%"} style={{borderRadius:"50px" , objectFit:"cover"}}   src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"} ></img>
</div>
<div className='CprofileName' >

  rohit

</div>

<div className='calling' > incoming video Call</div>

</div>

<div className='CsenderVideoFunction' >


<div  className='iconOfVideoCall' style={{background:"#ff3e4e"}}  onClick={()=>{SetcallingNotificationModal(false)}}  ><X style={{fontWeight:"900"}}   size={28} color="#fdfcfc" weight="thin" /></div>
<div  className='iconOfVideoCall' style={{background:"#75bf32"}} ><VideoCamera  onClick={()=>{
  SetcallingNotificationModal(false)
  selectTheChat(Offer.chatId)
  navigate("/insta/videocall" ,{
    state: {
      Offer
    }
  })
 
    
}}  color="white"  weight="fill"   size={24} /></div>


</div>
           
          </div>
        </div>
      </div>
    
  )
}

export default CallNotification