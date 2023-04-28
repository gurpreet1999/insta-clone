import React, { useEffect, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import download from "../img/download.png"
import "./Signup.css"
import { useMutation}  from "@tanstack/react-query"
import axios from "axios"

import {  toast } from 'react-toastify';
const SignUp = () => {

const navigate=useNavigate()
const[name,setname]=useState("")

const[email,setemail]=useState("")

const[password,setpassword]=useState("")

const[userName,setuserName]=useState("")
// useEffect(()=>{
//     localStorage.clear();
// })

//toast

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

//     //sending data to server

//     fetch("http://localhost:5000/signup",{
// method:"post",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({

//     name:name,
//     email:email,
//     userName:userName,
//     password:password
// })

//     }).then(res=>res.json()).then(data=>{
      
// if(data.error){
//     NotifyA(data.error)
// }else{
    
//     NotifyB(data.message)
//     navigate('/signin')
// }
// }  )

    
// }
const registerUser=async({name,userName,email,password})=>{
return await axios.post("http://localhost:5000/signup",

{name,userName,email,password},
{
    headers:{
        "Content-Type":"application/json"
    },
}
)

}


const mutation=useMutation(registerUser,{onSuccess:(data)=>{
   
    console.log(data)
    NotifyB(data.data.message)
  
    navigate('/signin')
},
onError:(data)=>{
   
    NotifyA(data.response.data.error)
}})




  return (
    <div className='signup'>
        <div className='formcontainer'>
            <div className='form'>
            <img className='signuplogo'  src={download}/>
        <p className='loginpara'>sign up to see photos and video  <br/>from your friends</p>
<div>
    <input type='email' name='email' id="email" placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)}  >
    </input>

</div>
<div>
    <input type='text' name='name' id="name"  placeholder='Full Name' value={name} onChange={(e)=>setname(e.target.value)} >
    </input>

</div>
<div>
    <input type='text' name='username' id="username" placeholder='Username' value={userName} onChange={(e)=>setuserName(e.target.value)} >
    </input>

</div>
<div>
    <input type='password' name='password' id="password" placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} >
    </input>

</div>

<p className='loginpara' style={{fontSize:"12px",margin:"3px 0px"}}> by signing up , you agree to out terms <br/> privacy a& policy and cookie policy </p>
<input type="submit" id="submit" onClick={()=>{mutation.mutate({name,email,userName,password})}}   value="Sign Up"/>

            </div>
            <div className='form2'>
already have an account?
<Link to='/signin'><span style={{color:"blue",}}>sign in</span></Link>


            </div>
       


        </div>





    </div>
  )
}

export default SignUp