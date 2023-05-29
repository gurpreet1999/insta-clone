 const express=require("express")

 const router=express.Router()


 const mongoose=require('mongoose')


 const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const requirelogin = require("../middleware/requirelogin")
const USER = require("../modal/modal")
 const jwtkey="abcde"


router.post('/signin',(req,res,next)=>{
   
 const {email,password}=req.body
 if(!email || !password){
   return res.status(422).json({error:"pls add email or password"})
 }

        USER.findOne({email:email}).then((saveduser)=>{
       if(!saveduser){
         return res.status(422).json({error:"pls write valid email id"})
          }

          bcrypt.compare(password,saveduser.password).then((match)=>{
           if(match){
      //return res.status(200).json({message:"signed in successfully"})

const token=jwt.sign({_id:saveduser._id},jwtkey)  // hume pehle parameter me woh wali id dalni hogi jo mongodb me uniqeily present he woh user ke liye
 const {_id,name,email,userName,photo}=saveduser
  res.json({token , user:{_id,name,email,userName,photo}} )
}

else{
  return res.status(402).json({error:"invalid password"})
}}).catch(err=>console.log(err))
           })


//          console.log(email)

//          res.json("ok fine")
//       // })

       


 })

 router.post("/signup",(req,res)=>{
   const {name,userName,email,password}=req.body
  
 
 if(!name || !email || !password || !userName){
    return  res.status(422).json({error:"pls add all the field"})
 }



 USER.findOne({$or:[{email:email},{userName:userName}]}).then((saveuser)=>{
  
    if(saveuser){
      return res.status(422).json({error:"user already exist with that email or username"})
  }


else{
  bcrypt.hash(password,10).then((hashedpass)=>{


const user=new USER({
  name,  
 email,
  userName,
  password:hashedpass   })

//   console.log(name)
user.save()

res.status(200).json({message:"registered successfully"})




  })
 
 
}

  
}  )


  
//console.log(req.body.name)
//res.json({message:" data saved succesfully"})
 })






 module.exports=router