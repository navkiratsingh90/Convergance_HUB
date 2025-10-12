import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  totalMembers: {
    type: Number,
    required: true,
  },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},	
	joinedMembers : [
		{
			username : mongoose.Schema.Types.ObjectId,
			ref : "User",
		}
	],
  unreadMessages: {
    type: Number,
    default: 0,
  },
  profilePic: {
    type: String, // Emoji or URL
  },
  about: {
    type: String,
  },
  onlineMembers: {
    type: Number,
    default: 0,
  },
	admins : [
		{
			username : mongoose.Schema.Types.ObjectId,
			ref : "User"
		}
	],
  topics: {
    type: [String],
    default: [],
  },
	pendingRequests : [
		{
			username : mongoose.Schema.Types.ObjectId,
			ref : "User"
		}
	]
}, { timestamps: true });

export default mongoose.model("discussion", discussionSchema);
