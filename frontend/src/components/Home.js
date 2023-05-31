import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { socket, connectSocket } from "../socket"

import { SocketContext } from "../context/SocketContext";
import { saveOffer } from "../redux/slice/authSlice";

export default function Home({SetcallingNotificationModal,setOffer}) {
  const queryclient=useQueryClient()
  const [online,setOnline]=useState("")
  
  const {token,user}=useSelector(state=>state.auth)
  
 
 

  useEffect(()=>{
    if(!socket){
      console.log("coonect hone ja raha he")
      connectSocket(user._id)
    }
       
    socket.on("getUsers",({users})=>{
   setOnline(users)
    })
  },[socket])
    
    
  
  



  useEffect(()=>{

    if(socket){
  
  
      socket.on("incomming:call",({from,offer,chatId})=>{
        console.log("incoming Request")
      
        setOffer({offer,from,chatId})
        SetcallingNotificationModal(true)

      })

      socket.on("postLikedBy",({mynotification})=>{
        queryclient.invalidateQueries("insta-post")
        console.log(mynotification)

      })
    }



  },[socket])
  




  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

  

  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

 
  // function to make comment
  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        // setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

const commentOnPost=async(comment)=>{
return await axios.put("http://localhost:5000/comment",comment,{
headers:{
  Authorization: "Bearer " + token
}

})

}




  
const likePost=async(post)=>{
   await axios.put("http://localhost:5000/like",
  {postid:post._id},{
    headers:{
      Authorization:"Bearer " + token
    }
  }
  )

  socket.emit("likedPost",{sender:user._id,receiver:post.postedby,type:"like"})


}




const unlikePost=async(user)=>{
  return await axios.put("http://localhost:5000/unlike",
  user,{
    headers:{
      Authorization:"Bearer " + token
    }
  }
  )
}


  const fetchpost=async ()=>{
    const data= await axios.get("http://localhost:5000/allposts",{
      headers:{
        Authorization: "Bearer " + token
      }
    })

    return data.data
  }

const {data,isLoading,isError}=useQuery(["insta-post"],fetchpost)


const mutation=useMutation(likePost,{
onSuccess:()=>{
  queryclient.invalidateQueries("insta-post")
}
})
const unlikeMutation=useMutation(unlikePost,{
  onSuccess:()=>{ queryclient.invalidateQueries("insta-post")}
 
})

const commentMutation=useMutation(commentOnPost,{
  onSuccess:()=>{
    queryclient.invalidateQueries("insta-post")
  }
})



  console.log(data)
  return (
    <div className="home">
      {/* card */}
      {  data && data.map((posts) => {
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic"  >
                <img style={{width:"40px" , height:"40px", borderRadius:"100%" ,objectFit:"fill"}}
                  src={posts.postedby?.photo ? posts.postedby.photo : picLink}
                  alt=""
                />
              </div>
              <h5 style={{textTransform:"capitalize"}}>
                <Link to={`/profile/${posts.postedby?._id}`}>
                  {posts.postedby?.name}
                </Link>
              </h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>

            {/* card content */}
            <div className="card-content">
              <div className="iconnnn">
              

<div className="first">
{posts.likes.includes(
          user._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                   unlikeMutation.mutate({postid:posts._id});
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    mutation.mutate(posts);
                  }}
                >
                  favorite
                </span>
              )}
  
  
  <div onClick={() => {
                  toggleComment(posts);
                }} ><img  src="https://cdn-icons-png.flaticon.com/512/3031/3031126.png" style={{width:"23px" , height:"23px"}}   ></img></div>
<img src="https://cdn-icons-png.flaticon.com/512/4121/4121446.png" style={{width:"23px" , height:"23px"}}  /></div>
<div className="second"><img src="https://cdn-icons-png.flaticon.com/512/5894/5894523.png" style={{width:"23px" , height:"23px"}} /></div>


</div>
              <p  style={{ fontWeight: "bold", cursor: "pointer" }}>{posts.likes.length} Likes</p>
              <div style={{ display:"flex", gap:"8px" }} ><p style={{ fontWeight:"bold", cursor: "pointer",textTransform:"capitalize" }}>{posts.postedby?.name}</p>{""}<p>{posts.body}</p> </div>
             <p  style={{  color:"slategray" ,cursor:"pointer" }}>Veiw all comments</p>
            </div>

            {/* add Comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined"  >mood</span>
              <input
                style={{backgroundColor:"rgb(235, 235 ,235)"}}
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
             
                className="comment"
                onClick={() => {
                commentMutation.mutate({text:comment, postId:posts._id});
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* show Comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedby.name}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedby.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>   {item.body}</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment" 
                  onClick={() => {
                    commentMutation({text:comment, postId:item._id});
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}