import React, { useEffect, useRef, useState } from "react";
import "./reel.css";
import {
  ArrowLeft,
  MusicNote,
  Record,
  VideoCamera,
} from "@phosphor-icons/react";
import camera from "../img/camera.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateReel = () => {

const navigate=useNavigate()
    const {token}=useSelector(state=>state.auth)
  const [video, setvideo] = useState(null);
  const [vidoUrl, setvideoUrl] = useState();

  const videoRef = useRef();

  const queryClient=useQueryClient()
const uploadReel=async(data)=>{
    console.log(data)
return await axios.post("http://localhost:5000/createreels",data,{
    headers:{
    "Content-Type":"application/json",
     authorization:"Bearer " + token
    }
})

}


const reelMutation=useMutation(uploadReel,{
    onSuccess:(data)=>{
    navigate("/")

    },
    onError:(err)=>{
console.log(err)
    }
})

  const uploadReelOnCloudinary = async () => {
    console.log("hello");
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "gurpreetcloud");

    const { data: url } = await axios.post(
      "https://api.cloudinary.com/v1_1/gurpreetcloud/video/upload",
      data
    );
    return url.url;
  };
  const mutation = useMutation(uploadReelOnCloudinary, {
    onSuccess: (data) => {
        reelMutation.mutate({reel:data,song:video.name})
    },
  });

  const inputref = useRef();

  const openinput = () => {
    inputref.current.click();
  };

  const loadFile = (event) => {
    let file = event.target.files[0];
    console.log(file)
    let bloburl = URL.createObjectURL(file);

    console.log(videoRef.current);
    videoRef.current.src = bloburl;
    videoRef.current.play();
  };

  return (
    <div className="bodycontainer">
      <div className="app__videos">
        <div className="video">
          {/* header */}
          <div
            style={{
              position: "absolute",
              width: "90%",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
            }}
          >
            <ArrowLeft style={{ zIndex: 9999 }} size={32} />

            <h3>Reels</h3>
            <MusicNote size={32} />
          </div>

          {/* video preview */}

          <video
            ref={videoRef}
            id="videoUpload"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src={""}
          ></video>

          {!video && (
            <div
              style={{
                position: "absolute",
                top: "5%",
                left: "5%",
                width: "100%",
                height: "100%",
              }}
            >
              <input
                type="file"
                ref={inputref}
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(event) => {
                  loadFile(event);
                  setvideo(event.target.files[0]);
                }}
                hidden
              ></input>
              <img
                onClick={openinput}
                style={{
                  width: "60%",
                  height: "30%",
                  margin: "auto",
                  marginTop: "240px",
                }}
                src={camera}
              />
            </div>
          )}

          {/* //footer */}

          <div style={{ position: "absolute", bottom: "0px", left: "42%" }}>
            <Record
              onClick={mutation.mutate}
              style={{ color: "black" }}
              size={60}
            />
          </div>
        </div>
        {mutation.isLoading || reelMutation.isLoading? <div id="cover-spin"></div> : ""}
      </div>
    </div>
  );
};

export default CreateReel;
