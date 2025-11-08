import Event from "../Models/event-model.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            startDate,
            startTime,
            Duration,
            location,
            tags,
            registrationLink,
            imageUrl,
            attendees,
        } = req.body;

        if (!title || !description || !type || !startDate || !location?.type) {
            return res.status(400).json({
                message:
                    "Missing required fields: title, description, type, startDate, or location.type",
            });
        }

        if (!["offline", "online", "hybrid"].includes(location.type)) {
            return res.status(400).json({ message: "Invalid location type" });
        }

        const event = new Event({
            title,
            description,
            type,
            startDate,
            startTime,
            Duration,
            location,
            tags,
            registrationLink,
            imageUrl,
            attendees,
        });

        const savedEvent = await event.save();
        res.status(201).json({
            message: "Event created successfully",
            data: savedEvent,
        });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const {
            filters = {},
            sort = "startDate",
            order = "asc",
            search = "",
        } = req.body;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }

        if (filters.type) {
            query.type = filters.type;
        }

        if (filters.startDate && filters.endDate) {
            query.startDate = {
                $gte: new Date(filters.startDate),
                $lte: new Date(filters.endDate),
            };
        }

        const sortOrder = order === "asc" ? 1 : -1;
        const sortObj = { [sort]: sortOrder };

        const events = await Event.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(limit);

        const totalEvents = await Event.countDocuments(query);
        const totalPages = Math.ceil(totalEvents / limit);

        res.status(200).json({
            message: "Events fetched successfully",
            data: events,
            pagination: {
                totalEvents,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Event retrieved successfully",
            data: event,
        });
    } catch (error) {
        console.error("Error getting event:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Event updated successfully",
            data: updatedEvent,
        });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            data: deletedEvent,
        });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const incrementAttendees = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { $inc: { attendees: 1 } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Attendee count incremented successfully",
            data: updatedEvent,
        });
    } catch (error) {
        console.error("Error incrementing attendees:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
