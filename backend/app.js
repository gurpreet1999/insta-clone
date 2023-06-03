const express=require('express')
const cors=require('cors')
const mongoose=require("mongoose")
const http=require("http")
const { Server } = require("socket.io");

const mongourl=require("./key");
const CHAT = require('./modal/chatModal');
const NOTIFICTION = require('./modal/notificationModal');
const { executionAsyncResource } = require('async_hooks');




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
   return users.find((user) => user.userId == userId);
 };



io.on("connection",(socket)=>{
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];
  console.log("bhai",user_id)
  if (user_id != null && Boolean(user_id)) {

    addUser(user_id, socket.id);
    io.emit("getUsers", users);
    console.log(users)
  }



    // socket.on("addUser", (userId) => {
    //   console.log(userId)
    //     addUser(userId, socket.id);
    //     io.emit("getUsers", users);
       
    //   });

      
     socket.on("room:join", ({ to ,from,room}) => {
        
        //  console.log( "bhai",  to)
         io.to(room).emit("user:joined", {  id: socket.id });
         socket.join(room)

         const user=getUser(to);
         if(user){
          io.to(user.socketId).emit("callingUser",{from:from,room:room});
         }
        });
      socket.on("room:join2", ({ to ,from,room}) => {
        io.to(room).emit("user:joined", {  id: socket.id });
         socket.join(room)
});

socket.on("user:call", ({ to, offer }) => {
  io.to(to).emit("incomming:call", { from: socket.id, offer });
});

socket.on("call:accepted", ({ to, ans }) => {
  io.to(to).emit("call:accepted", { from: socket.id, ans });
});


socket.on("peer:nego:needed", ({ to, offer }) => {
  console.log("peer:nego:needed", offer);
  io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
});

socket.on("peer:nego:done", ({ to, ans }) => {
  console.log("peer:nego:done", ans);
  io.to(to).emit("peer:nego:final", { from: socket.id, ans });
});


socket.on("sendMessage",async({senderId,receiverId,text,chatid})=>{

  console.log('sec')
  const user = getUser(receiverId);
  console.log(user)
  console.log("selected" ,chatid)

  if(user){
  io.to(user.socketId).emit("getMessageToSpecific", {
      senderId,
      text,
      chatid
    });
  }
 })


socket.on("likedPost",async({sender,receiver,type})=>{


  const notification={
    sender:sender,
    receiver:receiver._id,
    type:type
  }
const mynotification=await NOTIFICTION.create(notification).then((t)=>t.populate("sender"))




console.log("here reachingh")
console.log(receiver)
const user=getUser(receiver._id);

console.log(user)
if(user){
  io.to(user.socketId).emit("postLikedBy",{mynotification})
}



})






socket.on("disconnect",()=>{
  console.log("a user disconnected!");
  removeUser(socket.id);
  io.emit("getUsers", users);
})

})


httpServer.listen(port,()=>{
console.log("server is running at port 5000")

})