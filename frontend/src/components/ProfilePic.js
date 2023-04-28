import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


export default function ProfilePic({ changeprofile }) {
  const hiddenFileInput = useRef(null);
  
  const [url, setUrl] = useState("");
const {token,user}=useSelector(state=>state.auth)
 



 

const uploadonCloudinary=async(image)=>{
const data=new FormData();
data.append("file", image);
data.append("upload_preset", "insta-clone");
data.append("cloud_name", "gurpreetcloud");

const {data:url}= await axios.post("https://api.cloudinary.com/v1_1/gurpreetcloud/image/upload",data,{

})


return url.url


}

const cloudinaryMutation=useMutation(uploadonCloudinary,{
  onSuccess:(url)=>{
    profileMutation.mutate({pic:url});
  }
})


const queryclient=useQueryClient()

const postPic=async(pic)=>{
 return await axios.put("http://localhost:5000/uploadprofilepic",pic,{
  headers:{
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  }
})
  }

  const profileMutation=useMutation(postPic,{
onSuccess:()=>{
  changeprofile();
  queryclient.invalidateQueries(["user-detail",user._id])
  
}

  })


  

  const handleClick = () => {
    hiddenFileInput.current.click();
  };






  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
             cloudinaryMutation.mutate(e.target.files[0]);
            }}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }}>
            {" "}
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={changeprofile}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}