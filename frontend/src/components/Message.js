import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyChat from './MyChat'
import ChatBox from './ChatBox'
import {Box} from "@chakra-ui/layout"
import "./message.css"
import { House, InstagramLogo, User, MagnifyingGlass,  } from '@phosphor-icons/react'
import Avatar from './Avatar'
import reel from "../img/video.png"
import {Link } from "react-router-dom"

import CallNotification from './CallNotification'

import { SocketContext } from '../context/SocketContext'



const Message = () => {

 
  const {user}=useSelector(state=>state.auth)

  const socket=useContext(SocketContext)



  return (
    <>
    <div  className='main'> 
       <div className="nav">

        <div className='upper'>


<div  className='logo'>
<InstagramLogo size={32} color='red'  />
</div>
        
    
      
       
        <Link to={"/"}> <House size={32} /> </Link>
         
        <Link to={`/profile/${user._id}`}  >  <User size={32} weight="light"  /></Link>
      
        <Link to={"/reel"} ><img width={28} height={28}   src={reel}/></Link> 
        <Link to={""} ><MagnifyingGlass size={32} weight="thin" /></Link> 
      
        </div>
        <div className="">
        <Avatar image={user.photo}  />
        </div>
      </div>
      <div className="main-chatbody">
<MyChat socket={socket}  />
<ChatBox socket={socket}  />



      </div>
  

</div>


</>
  )
}

export default Message