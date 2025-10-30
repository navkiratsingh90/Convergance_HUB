import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    schoolName: { 
			type: String, 
			required: true 
		},
    duration: { 
			type: String, 
			required: true 
		},
    information: { 
			type: String 
		},
});

const workExperienceSchema = new mongoose.Schema({
    companyName: { 
			type: String, 
			required: true 
		},
    duration: { 
			type: String, 
			required: true 
		},
    role: { 
			type: String 
		},
    description: { 
			type: String 
		},
});

const skillsSchema = new mongoose.Schema({
    frontend: [{ 
			type: String 
		}],
    backend: [{ 
			type: String 
		}],
    tools: [{ 
			type: String 
		}],
    frameworks: [{ 
			type: String 
		}],
    libraries: [{ 
			type: String 
		}],
    languages: [{ 
			type: String 
		}],
    certifications: [{ 
			type: String 
		}],
});

const userSchema = new mongoose.Schema(
    {
        username: { 
					type: String, 
					required: true, 
					trim: true 
				},
        about: { 
					type: String, 
					default: "" 
				},
        email: { 
					type: String, 
					required: true, 
					unique: true 
				},

        verificationCode: { type: String },
        verificationExpiry: { type: Date },

        education: [educationSchema],
        workExperience: [workExperienceSchema],
        skills: skillsSchema,

        activityPosted: [
					{
							type: mongoose.Schema.Types.ObjectId,
							ref: "Activity",
					},
			],
        events: [
					{
							type: mongoose.Schema.Types.ObjectId,
							ref: "Events",
					},
			],
        projectCollaborations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "projectCollab",
            },
        ],
				activeProjects : [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: "projectFlow",
					},
				],
        totalPendingRequests: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        ],

        connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
