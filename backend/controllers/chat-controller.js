import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Discussion from "../models/discussion-model.js";
import Message from "../Models/message-model.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, discussionId, text = "", fileAttached = false } = req.body;

    if (!senderId || !discussionId) {
      return res.status(400).json({ msg: "Sender ID and Discussion ID are required." });
    }

    const validDiscussion = await Discussion.findById(discussionId);
    if (!validDiscussion) {
      return res.status(404).json({ msg: "Discussion not found." });
    }

    let fileUrl = null;
    let contentType = "text";

    if (req.file) {
      const { mimetype, path } = req.file;

      if (mimetype.startsWith("image/")) contentType = "image";
      else if (mimetype.startsWith("video/")) contentType = "video";
      else contentType = "raw";

      const uploadedFile = await cloudinary.uploader.upload(path, {
        resource_type: contentType,
        folder: "messages",
      });

      fs.unlinkSync(path);

      fileUrl = uploadedFile.secure_url;
    }

    const msg = await Message.create({
      sender: senderId,
      discussionId,
      text,
      fileAttached,
      contentType,
      attachments: fileUrl ? [{ url: fileUrl, filename: req.file?.originalname || "" }] : [],
    });

    validDiscussion.lastMessage = msg._id;
    await validDiscussion.save();

    return res.status(200).json({
      success: true,
      msg: "Message sent successfully.",
      messageData: msg,
    });

  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { discussionId } = req.body;
    const senderId = req.user?.userID;

    if (!senderId || !discussionId) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const validDiscussion = await Discussion.findOne({
      _id: discussionId,
      joinedMembers: { $in: [senderId] },
    });

    if (!validDiscussion) {
      return res.status(404).json({ msg: "Discussion not found or access denied." });
    }

    const allMessages = await Message.find({ discussionId })
      .populate("sender", "name email profilePic") 
      .populate("discussionId", "title profilePic")
      .sort({ createdAt: 1 }); 

    return res.status(200).json({
      success: true,
      count: allMessages.length,
      allMessages,
      msg: "Messages loaded successfully.",
    });
  } catch (error) {
    console.error("Error loading messages:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
