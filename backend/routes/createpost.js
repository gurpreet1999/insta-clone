
 const express=require("express")
 const router=express.Router()
 const mongoose=require("mongoose")
 const requirelogin = require("../middleware/requirelogin")
 const  POST=mongoose.model("POST")

// // route


router.post("/createpost",requirelogin,(req,res,next)=>{

     const {pic,body}=req.body;
    if(!pic || !body){
        return res.status(422).json({error:"please add all the fields"})
     }
   console.log(req.user)

 const post=new POST({
     
   body,
  photo:pic,
    postedby:req.user,

  })

post.save().then((result)=>{
return res.json({post:result})
}).catch((err)=>{
  console.log(err)
})


})



 router.get("/allposts",requirelogin,(req,res,next)=>{

    POST.find().populate("postedby","_id name photo").populate("comments.postedby","_id name").sort("-createdAt")
    .then((post)=>res.json(post)).catch((err)=>{
 console.log(err)
 })

})
// 


 router.get("/mypost",requirelogin,(req,res,next)=>{
POST.find({postedby:req.user._id})
.populate("postedby","_id name photo")
.populate("comments.postedby","_id name").sort("-createdAt")
.then((mypost)=>{
   return  res.json(mypost)})

 })

// 
 router.put("/like",requirelogin,(req,res,next)=>{

   
     POST.findByIdAndUpdate(req.body.postid,{
  $push:{likes:req.user._id}
},{
   new:true
}).populate("postedby","_id name photo").exec((err,result)=>{
    if(err){
return res.status(422).json({error:err})}
else{
  return   res.json(result)}

})

 })

 router.put("/unlike",requirelogin,(req,res,next)=>{

   POST.findByIdAndUpdate(req.body.postid,{
     $pull:{likes:req.user._id}
   },{
     new:true
   }).populate("postedby","_id name photo").exec((err,result)=>{
    if(err){
        return res.status(422).json({error:err})}
        else{
            res.json(result)
        }
  
   })
   
   })
   
router.put("/comment",requirelogin,(req,res,next)=>{
   const comment={
      comment:req.body.text,
      postedby:req.user._id
   }
   POST.findByIdAndUpdate(req.body.postid,{
      $push:{comments:comment}
   },{new:true}).populate("comments.postedby","_id name").populate("postedby","_id name photo").exec((err,result)=>{
      if(err){
         return res.status(422).json({error:err})
      }else{
         res.json(result)
      }
   })

})


router.delete("/deletepost/:postid",requirelogin,(req,res)=>{

POST.findOne({_id:req.params.postid}).populate("postedby","_id")
.exec((err,post)=>{
   if(err || !post){
      return res.status(422).json({error:err})


   }
   
if(post.postedby._id.toString()===req.user._id.toString()){
   post.remove().then((result)=>{
      return res.json({message:"sucesfully deleted"})
   }).catch((err)=>{
      console.log(err)
   })
}
})

})






router.post('/delete',async(req,res)=>{
   const imgid="http://res.cloudinary.com/cantacloud2/image/upload/v1672159545/ogb18ypcqcez5dtequfl.jpg"

await cloudinary.uploader.destroy(imgid)
res.json("ok deleted")

})







 module.exports=router