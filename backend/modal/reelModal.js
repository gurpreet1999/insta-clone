const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const reelsSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  song:{
    type: String,
    required: true,
  },
    likes: [{ type: ObjectId,
         ref: "USER" }],
    comments: [
      {
        comment: { type: String },
        postedby: { type: ObjectId, ref: "USER" },
      },
    ],
    postedby:{
        type:ObjectId,
        ref:"USER"
       
       
       
        },

  },
  { timestamps: true }
);

mongoose.model("REELS", reelsSchema);
