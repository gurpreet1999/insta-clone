import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ProfilePic from "./ProfilePic";

export default function UserProfie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { userid } = useParams();
  
  const [isFollow, setIsFollow] = useState(false);
 

  const { user: loggedInUser ,token} = useSelector((state) => state.auth);
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  
  const [changePic, setChangePic] = useState(false)
  const queryclient=useQueryClient()

  const fetchuser=async ()=>{
    const data= await axios.get(`http://localhost:5000/user/${userid}`,{
      headers:{
        Authorization: "Bearer " + token
      }
    })
  
    return data.data
  }

  const {data,isLoading}=useQuery(["user-detail",userid],fetchuser,{

     onSuccess:(data)=>{
    if(data.user.followers.includes(loggedInUser._id)){
      setIsFollow(true)
    }else{
      setIsFollow(false)
    }


       },
      

     
     
    })



  console.log(data,isLoading,isFollow)









  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      // setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }




const followUser=async(userId)=>{
return await axios.put("http://localhost:5000/follow",userId,{
  headers:{
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,

    }
  })

}


const followMutation=useMutation(followUser,{
  onSuccess:()=>{
queryclient.invalidateQueries(["user-detail",userid])
  },
  onError:{

  }
})


const unfollowUser=async(userId)=>{
return await axios.put("http://localhost:5000/unfollow",userId,{
  headers:{
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
})


}

const unfollowMutation=useMutation(unfollowUser,{
  onSuccess:()=>{
    queryclient.invalidateQueries(["user-detail",userid])
  }
})








  





  return (<>
  
  {
    isLoading?<div>loading</div>:(

      <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          {userid===loggedInUser._id ? (
            <img
              onClick={changeprofile}
              src={data.user.photo ? data.user.photo : ""}
              alt=""
            />
          ) : (
            <img src={data.user.photo ? data.user.photo:""} alt="" />
          )}
        </div>
        {/* profile-data */}

        <div
          className="profile-info"
          style={{ width: "60%", display: "flex", gap: "12px" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>{data.post.length}</h1>
            <h3 style={{ fontWeight: 400 }}> posts</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>{data.user?.followers ? data.user.followers.length : "0"} </h1>
            <h3 style={{ fontWeight: 400 }}>followers</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>{data.user?.following ? data.user.following.length : "0"} </h1>
            <h3 style={{ fontWeight: 400 }}>following</h3>
          </div>
        </div>
      </div>
      <div className="profile-data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>{data.user?.name}</h1>
        </div>
      </div>

      <div className="btn">
      {
        userid!==loggedInUser._id?(  <div
          className="followBtn"
          onClick={() => {
            if (isFollow) {
              unfollowMutation.mutate({followid:data.user._id});
            } else {
              followMutation.mutate({followid:data.user._id})
            }
          }}
          style={{ width: "40%" }}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </div>):
         ( <div
          className="followBtn"
         
          style={{ width: "40%" }}
        >
         edit profile
        </div>)
      }
       {
        userid!==loggedInUser._id?( <div className="followBtn" style={{ width: "40%" }}>
        message
      </div>):(
         <div className="followBtn" style={{ width: "40%" }}>
         share profile
       </div>
      )
       }
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {data.post.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              onClick={() => {
                  toggleDetails(pics)
              }}
              className="item"
            ></img>
          );
        })}
      </div>
      {show &&
        <PostDetail item={data.post} toggleDetails={toggleDetails} />
      }
         {
      changePic &&
      <ProfilePic changeprofile={changeprofile} />
    }
    </div>
  


    )
  }
  
  
  
  </>
   
  );
}
