const express=require('express')
const cors=require('cors')
const mongoose=require("mongoose")
const http=require("http")
const { Server } = require("socket.io");

const mongourl=require("./key");
const CHAT = require('./modal/chatModal');




const port=5000

const app=express()



mongoose.connect("mongodb+srv://gurpreetsingh:Shalu%401999@cluster0.apn6ahn.mongodb.net/?retryWrites=true&w=majority")


mongoose.connection.on("connected",()=>{
    console.log("mongodb is connected")
})
mongoose.connection.on("error",()=>{
    console.log("couldnt connected to mongodb")
})

app.use(cors())

app.use(express.json())

 require("./modal/modal")
 require("./modal/postmodel")
 require("./modal/reelModal")
 require("./modal/chatModal")

 app.use(require('./routes/createReel'))
 app.use(require('./routes/chatRoutes'))
 app.use(require('./routes/auth'))
 app.use(require('./routes/createpost'))
 app.use(require('./routes/user'))



 let httpServer=http.createServer(app)

 const io=new Server(httpServer,{cors:{origin:"http://localhost:3000"}})

 let users = [];

 const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId) &&
     users.push({ userId, socketId });
 };
 
 const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
 };
 
 const getUser = (userId) => {
   return users.find((user) => user.userId === userId);
 };



io.on("connection",(socket)=>{
    // console.log("hii this is socket-", socket.id)
    socket.on("addUser", (userId) => {
      console.log(userId)
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log(users)
      });

      
     socket.on("user:call", ({ to, offer ,from}) => {
         const user = getUser(to);
         console.log(to)
         if(user){
          io.to(user.socketId).emit("incomming:call", { from, offer });
         }
        
      });



socket.on("sendMessage",async({senderId,receiverId,text,chatid})=>{
  const user = getUser(receiverId);

  if(user){
  io.to(user.socketId).emit("getMessageToSpecific", {
      senderId,
      text,
      chatid
    });
  }
 else{
let chat=await CHAT.findOne({_id:chatid})

console.log(chat)
chat.notification.push({
  senderId:senderId,
  receiverId:receiverId,
  text:text



})

await chat.save()

console.log(chat)



 }
 
})









socket.on("disconnect",()=>{
  // console.log("a user disconnected!");
  removeUser(socket.id);
  io.emit("getUsers", users);
})

})


httpServer.listen(port,()=>{
console.log("server is running at port 5000")

})