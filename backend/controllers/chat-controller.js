import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Discussion from "../models/discussion-model.js";
import Message from "../Models/message-model.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, discussionId, text, fileAttached } = req.body;

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

export const editMessage = async (req, res) => {
  try {
    const { text, discussionId, messageId } = req.body;
    const senderId = req.user?.userID;

    if (!senderId || !discussionId || !text || !messageId) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ msg: "Discussion not found." });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ msg: "Message not found." });
    }

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({ msg: "You are not authorized to edit this message." });
    }

    message.text = text;
    const updatedMessage = await message.save();

    await discussion.save();

    return res.status(200).json({
      msg: "Message updated successfully.",
      message: updatedMessage,
    });
  } catch (error) {
    console.error("Error editing message:", error);
    return res.status(500).json({
      msg: "Internal server error.",
      error: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { discussionId, messageId } = req.body;
    const senderId = req.user?.userID;

    if (!senderId || !discussionId || !messageId) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ msg: "Discussion not found." });
    }

    const currMessage = await Message.findById(messageId);
    if (!currMessage) {
      return res.status(404).json({ msg: "Message not found." });
    }

    const isSender = currMessage.sender.toString() === senderId.toString();
    const isAdmin = discussion.admins?.some(
      (adminId) => adminId.toString() === senderId.toString()
    );

    if (!isSender && !isAdmin) {
      return res.status(403).json({ msg: "You are not authorized to delete this message." });
    }

    await Message.findByIdAndDelete(messageId);

    await Discussion.findByIdAndUpdate(discussionId, {
      $pull: { messages: messageId },
    });

    return res.status(200).json({ msg: "Message deleted successfully." });
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ msg: "Internal server error.", error: error.message });
  }
};

