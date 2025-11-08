import User from '../models/user-model.js'
import Activity from "../models/Activity.js";
import Challenge from "../models/Challenge.js";
import ProjectFlow from "../models/ProjectFlow.js";
import Discussion from "../models/Discussion.js"
// ===================== PROFILE =====================

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId)
      .populate("activeProjects")
      .populate("connectedUsers")
      .populate("challengesAttended");

    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching user" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { about },
      { new: true }
    );
    res.status(200).json({ msg: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ msg: "Error updating profile" });
  }
};

// ===================== EDUCATION =====================

export const addEducation = async (req, res) => {
  try {
    const userId = req.user;
    const { schoolName, duration, information } = req.body;

    const user = await User.findById(userId);
    user.education.push({ schoolName, duration, information });
    await user.save();

    res.status(200).json({ msg: "Education added", user });
  } catch (error) {
    res.status(500).json({ msg: "Error adding education" });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const userId = req.user;
    const { eduId } = req.params;

    const user = await User.findById(userId);
    user.education = user.education.filter((edu) => edu._id.toString() !== eduId);
    await user.save();

    res.status(200).json({ msg: "Education deleted", user });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting education" });
  }
};

// ===================== WORK EXPERIENCE =====================

export const addWorkExperience = async (req, res) => {
  try {
    const userId = req.user;
    const { companyName, duration, role, description } = req.body;

    const user = await User.findById(userId);
    user.workExperience.push({ companyName, duration, role, description });
    await user.save();

    res.status(200).json({ msg: "Work experience added", user });
  } catch (error) {
    res.status(500).json({ msg: "Error adding work experience" });
  }
};

export const deleteWorkExperience = async (req, res) => {
  try {
    const userId = req.user;
    const { workId } = req.params;

    const user = await User.findById(userId);
    user.workExperience = user.workExperience.filter(
      (w) => w._id.toString() !== workId
    );
    await user.save();

    res.status(200).json({ msg: "Work experience deleted", user });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting work experience" });
  }
};

// ===================== SKILLS =====================

export const updateSkills = async (req, res) => {
  try {
    const userId = req.user;
    const { frontend, backend, tools, frameworks, libraries, languages } =
      req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        skills: { frontend, backend, tools, frameworks, libraries, languages },
      },
      { new: true }
    );

    res.status(200).json({ msg: "Skills updated", user });
  } catch (error) {
    res.status(500).json({ msg: "Error updating skills" });
  }
};

// ===================== CONNECTIONS =====================

export const sendConnectionRequest = async (req, res) => {
  try {
    const requesterId = req.user;
    const { targetUserId } = req.body;

    if (!targetUserId || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ msg: "Valid targetUserId required." });
    }
    if (requesterId === targetUserId) {
      return res.status(400).json({ msg: "You cannot send a request to yourself." });
    }

    const [requester, targetUser] = await Promise.all([
      User.findById(requesterId),
      User.findById(targetUserId),
    ]);

    if (!requester || !targetUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Already connected?
    if (requester.connectedUsers.some(id => id.toString() === targetUserId)) {
      return res.status(400).json({ msg: "You are already connected with this user." });
    }

    // Request already pending on target user's side?
    if (targetUser.totalPendingRequests.some(id => id.toString() === requesterId)) {
      return res.status(400).json({ msg: "Connection request already sent." });
    }

    // If target has sent a request to requester (mutual), accept it automatically
    const mutualRequestIndex = requester.totalPendingRequests.findIndex(id => id.toString() === targetUserId);
    if (mutualRequestIndex !== -1) {
      // remove pending from requester and create connection both sides
      requester.totalPendingRequests.splice(mutualRequestIndex, 1);
      requester.connectedUsers.push(targetUserId);
      targetUser.connectedUsers.push(requesterId);

      await requester.save();
      await targetUser.save();

      return res.status(200).json({ msg: "Mutual requests found — users are now connected." });
    }

    // Otherwise add request to targetUser.pending
    targetUser.totalPendingRequests.push(requesterId);
    await targetUser.save();

    return res.status(200).json({ msg: "Connection request sent." });
  } catch (error) {
    console.error("sendConnectionRequest error:", error);
    return res.status(500).json({ msg: "Server error sending request." });
  }
};


export const approveConnectionRequest = async (req, res) => {
  try {
    const targetUserId = req.user; // the user who is approving
    const { requesterId } = req.body;

    if (!requesterId || !mongoose.Types.ObjectId.isValid(requesterId)) {
      return res.status(400).json({ msg: "Valid requesterId required." });
    }

    const [targetUser, requester] = await Promise.all([
      User.findById(targetUserId),
      User.findById(requesterId),
    ]);

    if (!targetUser || !requester) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Check that request exists
    const idx = targetUser.totalPendingRequests.findIndex(id => id.toString() === requesterId);
    if (idx === -1) {
      return res.status(400).json({ msg: "No pending request from this user." });
    }

    // Remove pending
    targetUser.totalPendingRequests.splice(idx, 1);

    // Add to connectedUsers if not already present
    if (!targetUser.connectedUsers.some(id => id.toString() === requesterId)) {
      targetUser.connectedUsers.push(requesterId);
    }
    if (!requester.connectedUsers.some(id => id.toString() === targetUserId)) {
      requester.connectedUsers.push(targetUserId);
    }

    await Promise.all([targetUser.save(), requester.save()]);

    return res.status(200).json({ msg: "Connection request approved. Users are now connected." });
  } catch (error) {
    console.error("approveConnectionRequest error:", error);
    return res.status(500).json({ msg: "Server error approving request." });
  }
};
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate("totalPendingRequests", "username email");
    if (!user) return res.status(404).json({ msg: "User not found." });

    return res.status(200).json({ pendingRequests: user.totalPendingRequests || [] });
  } catch (error) {
    console.error("getPendingRequests error:", error);
    return res.status(500).json({ msg: "Server error fetching pending requests." });
  }
};
export const removeConnection = async (req, res) => {
  try {
    const userId = req.user;
    const { targetUserId } = req.body;

    if (!targetUserId || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ msg: "Valid targetUserId required." });
    }

    const [user, target] = await Promise.all([
      User.findById(userId),
      User.findById(targetUserId),
    ]);

    if (!user || !target) return res.status(404).json({ msg: "User not found." });

    user.connectedUsers = user.connectedUsers.filter(id => id.toString() !== targetUserId);
    target.connectedUsers = target.connectedUsers.filter(id => id.toString() !== userId);

    await Promise.all([user.save(), target.save()]);

    return res.status(200).json({ msg: "Connection removed." });
  } catch (error) {
    console.error("removeConnection error:", error);
    return res.status(500).json({ msg: "Server error removing connection." });
  }
};
// ===================== PROJECTS =====================

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate("activeProjects");
    res.status(200).json({ projects: user.activeProjects });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};

export const addActiveProject = async (req, res) => {
  try {
    const userId = req.user;
    const { projectId } = req.body;
    const user = await User.findById(userId);

    if (!user.activeProjects.includes(projectId)) {
      user.activeProjects.push(projectId);
      await user.save();
    }

    res.status(200).json({ msg: "Project added", user });
  } catch (error) {
    res.status(500).json({ msg: "Error adding project" });
  }
};

export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId)
      .populate("activityPosted")
      .populate("challengesAttended")
      .populate("activeProjects")
      .populate("connectedUsers")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ---------- 1. Activities ------------
    const totalActivities = await Activity.countDocuments({ createdBy: userId });
    const totalLikesReceived = await Activity.aggregate([
      { $match: { createdBy: user._id } },
      { $project: { totalLikes: { $size: "$likes" } } },
      { $group: { _id: null, likes: { $sum: "$totalLikes" } } },
    ]);
    const totalCommentsReceived = await Activity.aggregate([
      { $match: { createdBy: user._id } },
      { $project: { totalComments: { $size: "$comments" } } },
      { $group: { _id: null, comments: { $sum: "$totalComments" } } },
    ]);

    // ---------- 2. Challenges ------------
    const totalChallenges = await Challenge.countDocuments({
      "leaderboard.userId": userId,
    });
    const totalSolvedChallenges = await Challenge.countDocuments({
      successfulSubmissions: userId,
    });

    // ---------- 3. Projects ------------
    const activeProjects = await ProjectFlow.find({ "members.user": userId });
    const totalTasksAssigned = activeProjects.reduce(
      (acc, project) =>
        acc +
        project.tasks.filter(
          (t) => t.assignedTo?.toString() === userId.toString()
        ).length,
      0
    );
    const completedTasks = activeProjects.reduce(
      (acc, project) =>
        acc +
        project.tasks.filter(
          (t) =>
            t.assignedTo?.toString() === userId.toString() &&
            t.status === "Completed"
        ).length,
      0
    );

    // ---------- 4. Discussions ------------
    const totalDiscussionsJoined = await Discussion.countDocuments({
      joinedMembers: userId,
    });
    const totalPendingDiscussionRequests = await Discussion.countDocuments({
      "pendingRequests.username": userId,
    });

    // ---------- 5. Graph Data (Time-series for charts) ------------
    const activityTimeline = await Activity.aggregate([
      { $match: { createdBy: user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const challengeTimeline = await Challenge.aggregate([
      { $match: { "leaderboard.userId": userId } },
      {
        $unwind: "$leaderboard",
      },
      { $match: { "leaderboard.userId": userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$leaderboard.submittedAt" },
          },
          score: { $sum: "$leaderboard.score" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ---------- Final Response ------------
    res.status(200).json({
      userInfo: {
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints,
        connections: user.connectedUsers.length,
      },
      analytics: {
        activities: {
          total: totalActivities,
          likes: totalLikesReceived[0]?.likes || 0,
          comments: totalCommentsReceived[0]?.comments || 0,
          timeline: activityTimeline,
        },
        challenges: {
          totalParticipated: totalChallenges,
          solved: totalSolvedChallenges,
          timeline: challengeTimeline,
					totalPointsScored : user.totalPoints
        },
        projects: {
          total: activeProjects.length,
          tasksAssigned: totalTasksAssigned,
          tasksCompleted: completedTasks,
        },
        discussions: {
          joined: totalDiscussionsJoined,
          pendingRequests: totalPendingDiscussionRequests,
        },
      },
      message: "User analytics fetched successfully",
    });
  } catch (error) {
    console.error("Error in getUserAnalytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};