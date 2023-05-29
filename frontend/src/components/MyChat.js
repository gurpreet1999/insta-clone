import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import ChatLoading from "./ChatLoading";
import { useDispatch, useSelector } from "react-redux";
import { useQuery,useQueryClient} from "@tanstack/react-query";
import { getPhoto, getSender, getSenderId, getTimeStamp } from "./chatLogic";
import { selectTheChat } from "../redux/slice/chatSlice";
import axios from "axios";
import Avatar from "./Avatar";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "@phosphor-icons/react";




const ChatListItems=({participants,message,animationDelay,user,selectedChat,chat,itemsRef,token })=>{

  const notificationmessage=""
  const dispatch=useDispatch()



  const selectTheChatAndRemoveNotification=async()=>{
    dispatch(selectTheChat(chat))

    const div1=itemsRef.current[getSenderId(user,chat.participants)]
    div1.lastChild.innerText=""
    if(div1.firstChild.class)
    await axios.post("http://localhost:5000/deletenotification",{chatid:chat._id},{
  headers:{
    Authorization:"Bearer " + token
  }


})
    
  }

    return (
        <div onClick={selectTheChatAndRemoveNotification}
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

        <div className="userMeta"  ref={el => itemsRef.current[getSenderId(user,participants)] = el}   >
          <p>{getSender(user,participants)}</p>
         {chat.notification.length>0 && user._id===chat.notification[0].receiverId?<span className="activeTime1">{chat.notification[0].text}</span>:<span className="activeTime" >{chat.messages[chat.messages.length-1]?.text}</span>
}
<span className="activeTimeClone" ></span>
        </div>
      </div>
    )
}









const MyChat = ({socket}) => {
  const itemsRef = useRef([]);

  const [messageNotification,setMessageNotification]=useState("")

  const isOnline=false
  const queryclient=useQueryClient()

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
itemsRef.current = itemsRef.current.slice(0, data.length);
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


useEffect(()=>{
  if(socket){
    socket.on("getMessageToSpecific", (data) => {
    if(data.chatid===selectedChat._id){
        
        queryclient.invalidateQueries(["mychatWithUser",selectedChat._id])
      }
      else{
  
setMessageNotification(data)
      }
  
    });
  }
 



},[socket])


useEffect(()=>{

if(messageNotification){
  const notifieduUser=allchats.find((elem)=>{
   const sender= getSenderId(user,elem.participants)
   if(sender===messageNotification.senderId){
    
    return elem
   }




  })


  
  const div1=itemsRef.current[getSenderId(user,notifieduUser.participants)]

 div1.lastChild.innerText=messageNotification.text

  
}



},[messageNotification])

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
              itemsRef={itemsRef}
              setMessageNotification={setMessageNotification}
              token={token}
              />
            );
          })}
        </div>
      </div>

  )
};

export default MyChat;
