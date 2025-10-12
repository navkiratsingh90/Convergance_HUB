import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  attachments: [
    {
      filename: String,
      url: String,
    }
  ],
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 

export default mongoose.model("Message", messageSchema);
