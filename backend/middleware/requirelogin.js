 const jwt=require("jsonwebtoken")
 const key="abcde"
 const mongoose=require("mongoose")
 const USER=mongoose.model("USER")


 module.exports=(req,res,next)=>{

   const {authorization}=req.headers;
   if(!authorization){
       return res.status(422).json({error:"u must have logged in"})   
       }

 const token=authorization.replace("Bearer ","")
 
 jwt.verify(token,key,(err,paylod)=>{
    if(err){
       return res.status(422).json({error:"u must have logged in"})

   }
   
const {_id}=paylod
USER.findById(_id).then((userdata)=>{
     req.user=userdata


    
     next()
 
})

 })
   
 
}