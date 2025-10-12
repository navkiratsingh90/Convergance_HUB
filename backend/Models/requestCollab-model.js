import mongoose from "mongoose";

const requestCollabSchema = new mongoose.Schema({
	projectReffered : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "projectCollab",
		required: true
	},	
	email : {
		type : String,
		required : true,
	},
	message : {
		type : String,
		required : true,
	},
	githubLink : {
		type : String,
	},
	resume : {
		type : String,
		required : true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},	
	rolesApplied : [
		{
			type : String,
		}
	],
	experience : {
		type : Number,
		required : true
	}
},{timestamps : true})