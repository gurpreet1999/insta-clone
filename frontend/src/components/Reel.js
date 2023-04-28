import React, { useEffect, useRef, useState } from "react";
import "./reel.css";
import VideoComponent from "./VideoComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const Reel = () => {

const [childRender,setChildRender]=useState(false)

 


const {token}=useSelector(state=>state.auth)
  const fetchReels = async () => {
    const { data } = await axios.get("http://localhost:5000/allreels", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  };

  const { data, isLoading } = useQuery(["reels"], fetchReels, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
};
  const callback=function(entries){

    entries.forEach((item)=>{
     if(item.isIntersecting){
      console.log(  item.target.childNodes[1])
    
      item.target.childNodes[1].play()
  

     }
    if(!item.isIntersecting){
      console.log(item.target.childNodes[1])
      item.target.childNodes[1].pause()
    }
    })

  }
useEffect(()=>{
  const observer=new IntersectionObserver(callback,options)
const number=document.querySelectorAll(".video")
if(number){
number.forEach((node)=>{
  observer.observe(node)
})
}

},[childRender])






  return (
    <div className="bodycontainer">
      <div className="app__videos">
        {data &&
          data.map((element) => (
          <VideoComponent  element={element}  setChildRender={setChildRender}/>
          ))}
      </div>
    </div>
  );
};

export default Reel;
