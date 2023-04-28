import React from 'react'
import { useSelector } from 'react-redux'
import MyChat from './MyChat'
import ChatBox from './ChatBox'
import {Box} from "@chakra-ui/layout"
import "./message.css"
import { House, InstagramLogo, User } from '@phosphor-icons/react'
import Avatar from './Avatar'

const Message = () => {
  const {user}=useSelector(state=>state.auth)

  return (
    <div  className='main'> 
       <div className="nav">

        <div className='upper'>


<div  className='logo'>
<InstagramLogo size={32} color='red'  />
</div>
        
    
      
       
        
         <House size={32} />  
        <User size={32} weight="light"  />
      
        </div>
        <div className="">
        <Avatar/>
        </div>
      </div>
      <div className="main-chatbody">
<MyChat/>
<ChatBox/>



      </div>
  

</div>
  )
}

export default Message