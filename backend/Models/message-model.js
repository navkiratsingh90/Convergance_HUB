import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    discussionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion", 
      required: true,
      index: true, 
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      trim: true,
      default: "",
    },
    fileUrl : {
      type : String,
      default : null,
    },
    contentType:{
      type:String,
      enum: ["video","image","text","raw"]
    },
    fileAttached: {
      type: Boolean,
      default: false,
    },
    isDelivered : {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
