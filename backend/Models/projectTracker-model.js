import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: { 
			type: String 
		},
    priority : {
      type : String,
      enum: ["Low", "Medium", "High"],
        default: "Low",
    },
    assignedTo: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User" 
		},
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
});

const memberRoleSchema = new mongoose.Schema({
    user: { 
			type: mongoose.Schema.Types.ObjectId, ref: "User", 
			required: true 
		},
    role: { 
			type: String, 
			required: true 
		},
    totalTasksCompleted : {
      type : String,
      default : 0
    }
});

const projectFlowSchema = new mongoose.Schema(
    {
        title: { 
					type: String, 
					required: true 
				},
        description: { 
					type: String 
				},
        timeline : {
          type : [
            {
              name : String,
            completed : { type : Boolean, default : false}
          }
          ]
        },
        leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: {
          type : [memberRoleSchema],
          default: []
        },
        tasks: {
          type : [taskSchema],
          default: []
        },
        githubLink: { 
					type: String
				},
        lastCommitMessage: { 
					type: String ,
          default : ""
				},
        status: {
            type: String,
            enum: ["Active", "On Hold", "Completed", "Not Started"],
            default: "Not Started",
        },
    },
    { timestamps: true }
);

const ProjectCollaboration = mongoose.model(
    "ProjectFlow",
    projectFlowSchema
);

export default ProjectCollaboration;
