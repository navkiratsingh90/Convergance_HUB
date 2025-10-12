import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Could also use Date type if you want exact timestamps
  },
  Duration: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["offline", "online", "hybrid"],
      required: true,
    },
    venue: String,
    address: String,
    mapLink: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  registrationLink: String,
  imageUrl: String,

  attendees: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
