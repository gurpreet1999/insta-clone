const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "USER",
    },
  ],
  messages: [
    {
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "USER",
      },
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "USER",
      },
      text: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
     
     
    },
  ],
});

const CHAT = new mongoose.model(
  "CHAT",
  chatSchema
);
module.exports = CHAT