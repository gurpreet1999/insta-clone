import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import ChatLoading from "./ChatLoading";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSender } from "./chatLogic";
import { selectTheChat } from "../redux/slice/chatSlice";
import axios from "axios";
import Avatar from "./Avatar";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "@phosphor-icons/react";



const ChatListItems=(props)=>{
    return (
        <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
     
        className={`chatlist__item ${
          props.active ?props.active : ""
        } `}
      >
        <Avatar
          image={
            props.image ? props.image : "http://placehold.it/80x80"
          }
          isOnline={props.isOnline}
        />

        <div className="userMeta">
          <p>{props.name}</p>
          <span className="activeTime">32 mins ago</span>
        </div>
      </div>
    )
}









const MyChat = () => {


  const allChatUsers = [
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          id: 1,
          name: "Tim Hover",
          active: true,
          isOnline: true,
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
          id: 2,
          name: "Ayub Rossi",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
          id: 3,
          name: "Hamaad Dejesus",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
          id: 4,
          name: "Eleni Hobbs",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
          id: 5,
          name: "Elsa Black",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
          id: 6,
          name: "Kayley Mellor",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
          id: 7,
          name: "Hasan Mcculloch",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
          id: 8,
          name: "Autumn Mckee",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
          id: 9,
          name: "Allen Woodley",
          active: false,
          isOnline: true,
        },
        {
          image: "https://pbs.twimg.com/profile_images/770394499/female.png",
          id: 10,
          name: "Manpreet David",
          active: false,
          isOnline: true,
        },
      ];
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
            <input type="text" placeholder="Search Here.." required />
           <div className="searchIcon" >
            <MagnifyingGlass size={18} weight="thin" />
            </div>
         
          </div>
         
        </div>
        <div className="archive" >
          <ArchiveBox size={32} weight="thin" />
     <h3>Archive</h3>
          </div>
        <div className="chatlist__items">
          {allChatUsers.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>

  )
};

export default MyChat;
