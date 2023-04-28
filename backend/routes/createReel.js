const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const requirelogin = require("../middleware/requirelogin")



const REELS=mongoose.model("REELS")


router.post("/createreels",requirelogin,(req,res,next)=>{

  console.log(req.user)

    const {reel,song}=req.body;
   if(!reel || !song){
       return res.status(422).json({error:"please add all the fields"})
    }
 

const post=new REELS({
    
  
 url:reel,
 song:song,
postedby:req.user,

 })

post.save().then((result)=>{
return res.json({post:result})
}).catch((err)=>{
 console.log(err)
})


})

router.get("/allreels",requirelogin,(req,res,next)=>{

  REELS.find().populate("postedby","_id name photo followers").populate("comments.postedby","_id name ").sort("-createdAt")
  .then((post)=>res.json(post)).catch((err)=>{
console.log(err)
})

})
// 



// // 
router.put("/reellike",requirelogin,(req,res,next)=>{


   REELS.findByIdAndUpdate(req.body.postid,{
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

router.put("/reelunlike",requirelogin,(req,res,next)=>{

 REELS.findByIdAndUpdate(req.body.postid,{
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
 
// router.put("/comment",requirelogin,(req,res,next)=>{
//  const comment={
//     comment:req.body.text,
//     postedby:req.user._id
//  }
//  POST.findByIdAndUpdate(req.body.postid,{
//     $push:{comments:comment}
//  },{new:true}).populate("comments.postedby","_id name").populate("postedby","_id name photo").exec((err,result)=>{
//     if(err){
//        return res.status(422).json({error:err})
//     }else{
//        res.json(result)
//     }
//  })

// })


// router.delete("/deletepost/:postid",requirelogin,(req,res)=>{

// POST.findOne({_id:req.params.postid}).populate("postedby","_id")
// .exec((err,post)=>{
//  if(err || !post){
//     return res.status(422).json({error:err})


//  }
 
// if(post.postedby._id.toString()===req.user._id.toString()){
//  post.remove().then((result)=>{
//     return res.json({message:"sucesfully deleted"})
//  }).catch((err)=>{
//     console.log(err)
//  })
// }
// })

// })


















module.exports=router