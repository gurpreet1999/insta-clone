
import { Link ,useNavigate } from 'react-router-dom'
import download from "../img/download.png"
import './signin.css'
import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
import { useContext } from 'react';
import {useMutation} from "@tanstack/react-query"

import { LoginContext } from "../context/LoginContext";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logIn } from '../redux/slice/authSlice';


const SignIn = () => {

const {setUserLogin}=useContext(LoginContext)


const dispatch=useDispatch()

  const navigate=useNavigate()
  const[email,setemail]=useState("")

  const[password,setpassword]=useState("")

//   useEffect(()=>{
//     localStorage.clear();
// })
  const NotifyA=(msg)=>toast.error(msg,{
    position: "top-center",
    theme: "dark",
})
const NotifyB=(msg)=>toast.success(msg,{
    position: "top-center",
    theme: "dark",
})


let emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const postdata=()=>{


// if(!emailregex.test(email)){
// NotifyA("email should be valid")
// return;
// }

//     //sending data to srver

//     fetch("http://localhost:5000/signin",{
// method:"post",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({

//     email:email,
  
//     password:password
// })

//     }).then(res=>res.json()).then(data=>{
      
//         if(data.error){
//             NotifyA(data.error)
//         }


// else{
//     NotifyB("Signed in Successfully")
//     localStorage.setItem("jwt",data.token)
//     localStorage.setItem("user",JSON.stringify(data.user))
//     setUserLogin(true)

    
//      navigate('/')
    
// }
// } )

    
// }

const loginUser=async(user)=>{
    return await axios.post("http://localhost:5000/signin",
    user,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

const mutation=useMutation(loginUser,{
    onSuccess:(data)=>{
        console.log(data)
         dispatch(logIn(data.data))
        NotifyB("Signed in Successfully")
        navigate('/')
    },
    onError:(data)=>{
        console.log(data)
        NotifyA(data.response.data.error)
    }
})

  return (
    <div className='signin'>

    <div>
<div className='loginform'>
<img className='signuplogo'  src={download}/>
<div>
<input type='email' name='email' id="email" placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)}>
</input>

</div>
<div>
<input type='password' name='password' id="password" placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)}>
</input>

</div>
<input type="submit" id="submit2" onClick={()=>{mutation.mutate({email,password})}}     value="Sign In"/>

<div className='styling' style={{marginBottom:'10px'}}   >OR</div>

<div className='fcbook '><img style={{width:"20px", height:"20px"}}   src='https://cdn-icons-png.flaticon.com/512/124/124010.png'/><h6 style={{fontSize:"15px" }}   >Log in with Facebook</h6></div>
<div style={{marginTop:"10px",  color: "#03459b"  }}>Forgot Password?</div>

</div>

<div className='form2' style={{textTransform:"capitalize"}} >
dont have an account?
<Link to='/signup'>   <span style={{color:"#4c68d7", fontWeight:"bold"}}>sign up</span></Link>

</div>

    </div>



</div>
)
}

export default SignIn