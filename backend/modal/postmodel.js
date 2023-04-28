 const mongoose=require("mongoose")



 const {ObjectId}=mongoose.Schema.Types

 

 const Schema=mongoose.Schema;
 



 const postSchema=new Schema({

 body:{
     type:String,required:true
 },
 photo:{type:String,required:true},
 likes:[{type:ObjectId,ref:"USER"}],
 comments:[{
     comment:{type:String},
 postedby:{type:ObjectId,ref:"USER"}
 }],

 
 postedby:{
 type:ObjectId,
 ref:"USER"



 }

 },{timestamps:true})

 mongoose.model("POST",postSchema)