import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["coding", "mcq", "aptitude", "cs_fundamentals", "puzzle"],
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  date: {
    type: Date,
    default: Date.now, 
  },

  testCases: [
    {
      input: { type: String },
      output: { type: String },
      isHidden: { type: Boolean, default: false },
    },
  ],

  mcqOptions: [
    {
      optionText: { type: String },
      isCorrect: { type: Boolean, default: false },
    },
  ],

  leaderboard: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
      score: Number,
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  correctAnswer: {
    type: String,
  },
  tags: [String],
  totalSubmissions: {
    type: Number,
    default: 0,
  },
  successfulSubmissions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "User"
		}
	],
  isActive: {
    type: Boolean,
    default: true,
  },

});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
