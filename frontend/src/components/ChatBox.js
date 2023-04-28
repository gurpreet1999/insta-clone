import React from "react";
import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { CaretDown, Link, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from "@phosphor-icons/react";


const ChatItem=(props)=>{
    return (
        <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ?props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{props.msg}</div>
         
        </div>
        <Avatar isOnline="active" image={props.image} />
      </div>
    )
}



const ChatBox = () => {
  
const   chat= [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];


  return (
    <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

          
            <div className="headerIcon">
            
              <div className="first" >
              <Phone size={50} weight="thin" />
              <VideoCamera size={50} weight="thin" />
              <MagnifyingGlass size={50} weight="thin" />
              </div>
             <div>
             <CaretDown size={32} weight="thin" />
             </div>

             
            </div>
          
        </div>
        <div className="content__body">
          <div className="chat__items">
            { chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
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
            
            />
              <Smiley size={32} weight="thin" />
            <button className="btnSendMsg" id="sendMsgBtn">
          
            <PaperPlaneTilt size={32} weight="thin" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default ChatBox;
