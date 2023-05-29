const requirelogin = require("../middleware/requirelogin");
const CHAT = require("../modal/chatModal");
const USER = require("../modal/modal");

const chatrouter = require("express").Router();

chatrouter.post("/accesschat", requirelogin, async (req, res, next) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      res.send("sorry");
    }

    const chat = await CHAT.find({
      $and: [
        { participants: { $elemMatch: { $eq: userid } } },
        { participants: { $elemMatch: { $eq: req.user._id } } },
      ],
    }).populate("participants", " name id photo")
    
    if (chat.length > 0) {
      return res.send(chat);
    } else {
      var newchat = {
        participants: [userid, req.user._id],
      };

      const createdChat = await CHAT.create(newchat);
      const fullchat = await CHAT.find({ _id:createdChat._id}).populate(
        "participants",
        "name id photo"
      );
      res.send(fullchat);
    }
  } catch (err) {
    console.log(err);
  }
});

chatrouter.get("/fetchchat", requirelogin, async (req, res, next) => {
  try {
    const allchatWithMyLoginUser = await CHAT.find({
      participants: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("participants", "name id photo")
     

   return res.send(allchatWithMyLoginUser)

  } catch (err) {
    console.log(err)
  }
});


chatrouter.post("/sendmessage", requirelogin, async (req, res, next) => {

const {text,to,chatid}=req.body;

if(!text || !to || !chatid){
    res.send("sorry")
}

const chat=await CHAT.findById(chatid)

chat. messages.push({to:to,from:req.user._id,text:text})

await chat.save()

return res.send(chat)







})

chatrouter.post("/deletenotification", requirelogin, async (req, res, next) => {

  const {chatid}=req.body;

  const chat=await CHAT.findOne({_id:chatid})
  chat.notification=[]
  chat.save()

})



chatrouter.post("/allmessage", requirelogin, async (req, res, next) => {

const {chatid}=req.body

const allMessage=await CHAT.findById(chatid).populate({path:"messages",populate:{path:"to",select:"name id photo"}}).populate({path:"messages",populate:{path:"from",select:"name id photo"}})

return res.send(allMessage)

})


module.exports = chatrouter;
