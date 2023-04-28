const express=require('express')
const cors=require('cors')
const mongoose=require("mongoose")

const mongourl=require("./key")




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


app.listen(port,()=>{
console.log("server is running at port 5000")

})