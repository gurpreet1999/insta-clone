import React, { useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import ChatLoading from "./ChatLoading";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getPhoto, getSender, getSenderId, getTimeStamp } from "./chatLogic";
import { selectTheChat } from "../redux/slice/chatSlice";
import axios from "axios";
import Avatar from "./Avatar";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "@phosphor-icons/react";



const ChatListItems=({participants,message,animationDelay,user,selectedChat,chat})=>{

  const dispatch=useDispatch()
    return (
        <div onClick={()=>{dispatch(selectTheChat(chat))}}
        style={{ animationDelay:`0.${animationDelay}s` }}
     
        className={`chatlist__item ${
          selectedChat._id===chat._id?"active":""
        } `}
      >
        <Avatar
          image={
      getPhoto(user,participants)
          }
        
        />

        <div className="userMeta">
          <p>{getSender(user,participants)}</p>
          <span className="activeTime">""</span>
        </div>
      </div>
    )
}









const MyChat = () => {

  const [chatWithUser,setChatWithUser]=useState([])

const {token,user}=useSelector(state=>state.auth)

const {selectedChat}=useSelector(state=>state.chat)

  

const fetchAllChat=async()=>{
const {data}=await axios.get("http://localhost:5000/fetchchat",{
  headers:{
    Authorization:"Bearer " + token
  }
})

return data
}

const {data:allchats}=useQuery(["allchatWithUser"],fetchAllChat,{
  onSuccess:(data)=>{
setChatWithUser(data)
  }
})

const searchChat=(e)=>{

  if(e.target.value){
    const search=allchats.filter((item)=>{
      return getSender(user,item.participants)?.startsWith(e.target.value)
    })
  


    setChatWithUser(search)
  }
  else{
    setChatWithUser(allchats)
  }
}



  return (

 <div className="main__chatlist">
       
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
          <CircleDashed size={32} weight="thin" />
          </button>
        </div>
        <div className="">
          <div className="search">
            <input type="text" placeholder="Search Here.." required onChange={searchChat}  />
           <div className="searchIcon"    >
            <MagnifyingGlass size={18} weight="thin" />
            </div>
         
          </div>
         
        </div>
        <div className="archive" >
          <ArchiveBox size={32} weight="thin" />
     <h3>Archive</h3>
          </div>
        <div className="chatlist__items">
          {chatWithUser && chatWithUser.map((item, index) => {
            return (
              <ChatListItems
                participants={item.participants}
                key={item.id}
                animationDelay={index + 1}
              message={item.messages}
              user={user}
              selectedChat={selectedChat}
              chat={item}
               
              />
            );
          })}
        </div>
      </div>

  )
};

export default MyChat;
