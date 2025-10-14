import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  incrementAttendees,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);

router.post("/all", getAllEvents); 

router.get("/:id", getEventById);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id/attend", incrementAttendees);

export default router;
