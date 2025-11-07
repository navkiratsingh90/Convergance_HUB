import User from "../models/user-model.js";
import ProjectTracker from "../models/projectTracker-model.js";

// controller which i will be making...

// create new project for tracking progress -> add teamates, desc, title, status,
export const createNewProject = async (req, res) => {
    try {
        const {
            title,
            description,
            timeline,
            leader,
            members,
            githubLink,
            status,
        } = req.body;
				if (!title || !description || !timeline || !leader || !status || !githubLink){
					res.status(400).send({
					msg : "invalid credentials"
					})
				}
				const newProject = await ProjectTracker.create({
					title,
					description,
					timeline,
					leader,
					members,
					githubLink,
					status,
				})
				res.status(200).send({
					msg : "success",
					newProject
				})

    } catch (error) {
        console.error(error);
    }
};

// assign roles to each member
export const addMembers = async (req,res) => {
	try {
			const {members, projectId} = req.body
			if (!members) 	res.status(400).send({
				msg : "invalid credentials"
				})
			const project = await ProjectTracker.findById(projectId)
				for (let member of members) {
					const existingMember = project.members.some(
							(m) => member.user.toString() === m.user.toString()
					);

					if (existingMember) {
							return res
									.status(400)
									.json({ msg: "User already exists in this team" });
					}
			}

			const userIds = currentTeamMembers.map((m) => m.user.toString());
			const hasDuplicates = new Set(userIds).size !== userIds.length;
			if (hasDuplicates) {
					return res
							.status(400)
							.json({
									message: "Duplicate users found in currentTeamMembers",
							});
			}
			for (let member of members) {
				project.members.push(member);
		}
		const updatedProject = await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
	} catch (error) {
		console.error(error);
	}
}

// assign tasks to each member
export const assignTasks = async (req,res) => {
	try {
			const {description, priority, assignedTo, projectId } = req.body
			const userId = req.user
			if (!description || !priority || !assignedTo || !projectId){} // invalid credentials
			const currProject = await ProjectTracker.findById(projectId)
			if (!currProject){} // no project
			const leader = currProject.leader
			if (leader.toString() !== userId.toString()) {} // not a leader
			const isMember = currProject.members.some((ele) => ele.user.toString() === assignedTo.toString());
			if (!isMember) {} // not a member
			const task = {
				description,
				priority,
				assignedTo,
			}
			currProject.tasks.push(task)
			const currtask = await currProject.save()
			res.status(200).json({
				message: "Project updated successfully",
				task: currtask,
		});
	} catch (error) {
			console.error(error);
	}
}
//get tasks by user
export const getUserTasks = async (req,res) => {
	try {
			const {projectId} = req.params
			const userId = req.user
			if (!userId || !projectId) {} // not a valid user

			const currProject = await ProjectTracker.findById(projectId)
			if (!currProject) {} //not a valid project
			const haveJoined = currProject.members.some((ele) => ele.user.toString() === userId.toString())
			if (!haveJoined) {} // not a member
			const userTasks = []
			for (let task of currProject.tasks){
				if (task.assignedTo.toString() == userId.toString()){
					userTasks.push(task)
				}
			}
			res.status(200).json({
				message: "Project updated successfully",
				allTasks: userTasks,
		});
	} catch (error) {
			console.error(error);
	}
}
// get completed tasks at any moment

// get tasks acc to priority

// make changes in project like changing its commit, change its timeline , status, marking updations
// export const updateCurrentProject = async (req,res) => {
// 	try {
// 			const 
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// get any tracker by id
export const getProjectById = async (req,res) => {
	try {
			const {projectId} = req.params
			const userId = req.user
			if (!projectId) {} // problem

			const currProject = await ProjectTracker.findById(projectId)
			
			if (!currProject) {} // problem

			const isMember = currProject.members.some((ele) => ele.user.toString() === userId.toString())
			if (!isMember) {} //problem

			const userTasks = []
			for (let task of currProject.tasks){
				if (task.assignedTo.toString() == userId.toString()){
					userTasks.push(task)
				}
			}
			const progressMeter = 0;
			const totalTimelinesCompleted = 0;
			for (let time of currProject.timeline){
				if (time.completed) totalTimelinesCompleted++
			}
			progressMeter = totalTimelinesCompleted/currProject.timeline.length

			res.status(200).json({
				message: "Project fetched successfully",
				allTasks: userTasks,
				members : currProject.members,
				progressMeter,
				project : currProject
		});
			
	} catch (error) {
			console.error(error);
	}
}
// get all ongoing projects
export const getProjectByStatus = async (req,res) => {
	try {
		const userId = req.user
		const query = req.query
		if (!userId || !query ) {} //error
		const Projects = await ProjectTracker.find()
			
		if (!currProject) {} // problem
		const newProjects = []
		for (let project of Projects){
			if (project.status == query) newProjects.push(project);
		}

		res.status(200).json({
			message: "Project fetched successfully",
			project : newProjects
	});
	} catch (error) {
			console.error(error);
	}
}
// delete any project by id
export const deleteProjectById = async (req,res) => {
	try {
		const {projectId} = req.params
			const userId = req.user
			if (!userId || !projectId) {} // error

			const currProject = await ProjectTracker.findbyId(projectId)
			
			if (!currProject) {} // problem
	} catch (error) {
			console.error(error);
	}
}


// get top contributers teammates for a project by id

//
