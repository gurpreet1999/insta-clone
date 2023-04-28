import React, { useEffect, useRef, useState } from "react";
import "./reel.css";
import vedio from "../img/chandSitare.mp4";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChatCircle,
  ChatCircleText,
  Heart,
  PaperPlane,
  PaperPlaneTilt,
} from "@phosphor-icons/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoComponent = ({ element,setChildRender }) => {
  
  

  const videoRef=useRef()

  const [playing, setplaying] = useState(false);

  const playpauseHandler = () => {
    if (playing) {
      videoRef.current.pause();
      setplaying(false);
    } else {
      videoRef.current.play();
      setplaying(true);
    }
  };

  const queryclient = useQueryClient();
  const { token, user } = useSelector((state) => state.auth);

  const likePost = async (post) => {
    return await axios.put("http://localhost:5000/reellike", post, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const unlikePost = async (post) => {
    return await axios.put("http://localhost:5000/reelunlike", post, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const likemutation = useMutation(likePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("reels");
    },
  });
  const unlikeMutation = useMutation(unlikePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("reels");
    },
  });

  const followUser = async (userId) => {
    return await axios.put("http://localhost:5000/follow", userId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  const followMutation = useMutation(followUser);

  const unfollowUser = async (userId) => {
    return await axios.put("http://localhost:5000/unfollow", userId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  const unfollowMutation = useMutation(unfollowUser, {
    onSuccess: () => {},
  });
  const Navigate = useNavigate();

  const navigateee = () => {
    Navigate("/");
  };
  const createreel = () => {
    Navigate("/reel-create");
  };


useEffect(()=>{
setChildRender(true)
},[])

  return (
    <div className="video"  >
      {/* <!-- header starts --> */}
      <div className="videoHeader">
        <ArrowLeft onClick={navigateee} style={{ zIndex: 9999 }} size={32} />

        <h3>Reels</h3>
        <span
          style={{ zIndex: 9999, cursor: "pointer" }}
          onClick={createreel}
          className="material-icons"
        >
          {" "}
          camera_alt{" "}
        </span>
      </div>
      {/* <!-- header ends --> */}

      <video
        className="video__player"
        onClick={playpauseHandler}
       ref={videoRef}
        src={element.url}
      ></video>

      {/* <!-- //sidebar --> */}
      <div className="videoSidebar">
        <div className="videoSidebar__button">
          {element.likes.includes(user._id) ? (
            <Heart
              color="red"
              onClick={() => {
                unlikeMutation.mutate({ postid: element._id });
              }}
              size={32}
              weight="fill"
            />
          ) : (
            <Heart
              onClick={() => {
                likemutation.mutate({ postid: element._id });
              }}
              size={32}
            />
          )}

          <p>{element.likes.length}</p>
        </div>

        <div className="videoSidebar__button">
          <ChatCircle size={32} />
          <p>{element.comments.length}</p>
        </div>

        <div className="videoSidebar__button">
          <PaperPlaneTilt size={32} />
          <p>12</p>
        </div>
      </div>

      {/* <!-- footer starts --> */}
      <div className="videoFooter">
        <div className="videoFooter__text">
          <img className="user__avatar" src={element.postedby.photo} alt="" />
          <Link to={`/profile/${element.postedby._id}`}>
            <h3>{element.postedby.name}</h3>
          </Link>
          <h3>
            {" "}
            •{" "}
            {element.postedby.followers.includes(user._id) ? (
              <button
                onClick={() => {
                  unfollowMutation.mutate({ followid: element.postedby._id });
                }}
              >
                unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  followMutation.mutate({ followid: element.postedby._id });
                }}
              >
                follow
              </button>
            )}
          </h3>
        </div>

        <div className="videoFooter__ticker">
          <span className="material-icons"> music_note </span>
          <marquee
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {element?.song}
          </marquee>
        </div>
      </div>

      {/* <!-- footer ends --> */}
    </div>
  );
};

export default VideoComponent;
