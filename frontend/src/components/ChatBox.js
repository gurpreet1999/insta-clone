import React, { useRef } from "react";
import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { CaretDown,Link, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from "@phosphor-icons/react";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import axios from "axios";
import { getPhoto, getSender, getSenderFull, getSenderId, photo } from "./chatLogic";
import {Link as MyLink} from "react-router-dom"

const ChatItem=({message,user})=>{
    return (
        <div
    
        className={`chat__item ${getSenderFull(user,message)}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{message.text}</div>
         
        </div>
        <Avatar isOnline="active" image={photo(user,message)} />
      </div>
    )
}



const ChatBox = () => {

  const inputRef=useRef()

  const queryclient=useQueryClient()

  const {selectedChat}=useSelector(state=>state.chat)
  const {token,user}=useSelector(state=>state.auth)

  const fetchMyAllMessage=async()=>{
const {data}= await axios.post("http://localhost:5000/allmessage",{chatid:selectedChat._id},{
  headers:{
    Authorization:"Bearer " + token
  }
})
return data
  }

const {data:MyMessage}=useQuery(["mychatWithUser",selectedChat._id],fetchMyAllMessage,{
  onSuccess:(data)=>{
console.log(data)
  },
 
})

  

const sendmessage=async(chat)=>{
  if(chat.text===""){
    console.log("no text")
    return
  }
  inputRef.current.value=""
  console.log(chat)
 return  await axios.post("http://localhost:5000/sendmessage",chat,{
headers:{
  Authorization:"Bearer " + token
}
})

}


const sendMessagemutation=useMutation(sendmessage,{
  onSuccess:(data)=>{

queryclient.invalidateQueries(["mychatWithUser",selectedChat._id])
  }
})

const sendingMessageHandler=(e)=>{
if(e.keyCode===13){

sendMessagemutation.mutate({chatid:selectedChat._id,to:getSenderId(user,selectedChat.participants), text:inputRef.current.value})


}
}


  return (
    <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user"   >
            <MyLink to={`/profile/${getSenderId(user,selectedChat.participants)}`} >  <Avatar
                isOnline="active"
               image={getPhoto(user,selectedChat.participants)}
              />
              </MyLink>
              <p>{getSender(user,selectedChat.participants)}</p>
            </div>
          </div>

          
            <div className="headerIcon">
            
              <div className="first" >
                         <div>  <Phone size={25} weight="thin" /></div>
            
                         <div> <VideoCamera size={25} weight="thin" /></div>
                         <div>  <MagnifyingGlass size={25} weight="thin" /></div>
              </div>
             <div>
             <CaretDown size={32} weight="thin" />
             </div>

             
            </div>
          
        </div>
        <div className="content__body">
          <div className="chat__items">
            {MyMessage && MyMessage.messages.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  message={itm}
                  user={user}
                />
              );
            })}
            <div  />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
            <Link size={32} weight="thin" />
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              ref={inputRef}
              onKeyDown={sendingMessageHandler}
            
            />
              <Smiley size={32} weight="thin" />
            <button className="btnSendMsg" id="sendMsgBtn"  onClick={()=>{sendMessagemutation.mutate({chatid:selectedChat._id,to:getSenderId(user,selectedChat.participants), text:inputRef.current.value})}}   >
          
            <PaperPlaneTilt size={32} weight="thin" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default ChatBox;
