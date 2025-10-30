import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: { 
			type: String 
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
        leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalMembers: { 
					type: Number, 
					default: 1 
				},
        members: [memberRoleSchema],
        tasks: [taskSchema],
        githubLink: { 
					type: String 
				},
        lastCommitMessage: { 
					type: String 
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
