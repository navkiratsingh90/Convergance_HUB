import express from "express";
import {
  createNewProject,
  addMembers,
  assignTasks,
  getUserTasks,
  markTaskCompleted,
  updateProject,
  getProjectById,
  getProjectByStatus,
  deleteProjectById,
  getTopContributors,
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getProjectCalendar,
  removeMember,
  deleteTask,
} from "../controllers/projectTracker-controller.js";

import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Ensure authentication

const router = express.Router();

/* -------------------- 📁 PROJECT ROUTES -------------------- */

// ✅ Create new project
router.post("/create", authMiddleware, createNewProject);

// ✅ Add members to a project
router.post("/add-members", authMiddleware, addMembers);

// ✅ Update project info (GitHub, status, etc.)
router.put("/update/:projectId", authMiddleware, updateProject);

// ✅ Get project by ID
router.get("/:projectId", authMiddleware, getProjectById);

// ✅ Get projects by status
router.get("/", authMiddleware, getProjectByStatus);

// ✅ Delete a project
router.delete("/:projectId", authMiddleware, deleteProjectById);


/* -------------------- 👥 MEMBER MANAGEMENT -------------------- */

// ✅ Remove member from project
router.delete("/remove-member", authMiddleware, removeMember);


/* -------------------- ✅ TASK MANAGEMENT -------------------- */

// ✅ Assign task to a member
router.post("/assign-task", authMiddleware, assignTasks);

// ✅ Get tasks assigned to logged-in user
router.get("/:projectId/user-tasks", authMiddleware, getUserTasks);

// ✅ Mark a task completed
router.put("/task/complete", authMiddleware, markTaskCompleted);

// ✅ Delete a task
router.delete("/:projectId/task/:taskId", authMiddleware, deleteTask);


/* -------------------- 📊 CONTRIBUTIONS -------------------- */

// ✅ Get top contributors for a project
router.get("/:projectId/top-contributors", authMiddleware, getTopContributors);


/* -------------------- 🗓️ CALENDAR MANAGEMENT -------------------- */

// ✅ Add event to project calendar
router.post("/:projectId/calendar", authMiddleware, addCalendarEvent);

// ✅ Update event
router.put("/:projectId/calendar/:eventId", authMiddleware, updateCalendarEvent);

// ✅ Delete event
router.delete("/:projectId/calendar/:eventId", authMiddleware, deleteCalendarEvent);

// ✅ Get all events for a project
router.get("/:projectId/calendar", authMiddleware, getProjectCalendar);

export default router;
