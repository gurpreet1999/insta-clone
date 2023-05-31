const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const notificationSchema= new mongoose.Schema({
  sender:{ type:ObjectId,
    ref: "USER",},
  receiver:{ type:ObjectId,
    ref: "USER",},
    type:{type:String,
    required:true},
    content:{type:String,
       }

 
},{
  timestamps:true
})



const NOTIFICTION=new mongoose.model("NOTIFICATION",notificationSchema)
module.exports =NOTIFICTION
