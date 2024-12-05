import dbConnect from "@/app/lib/dbConnect";
import Event from "@/models/event";
import User from "@/models/user";

/**
* @param {{name: String, description: String, startDate: Date, endDate: Date, location: String, code: String, attendees: []}} eventData
* */
async function createEvent(eventData) {
    await dbConnect();
    const code = Math.round(Math.random() * 100000);
    const event = Event.create({ ...eventData, code });
    return event;
}

async function getAllEvents() {
    await dbConnect();
    const events = await Event.find();
    return events;
}

async function getEventById(id) {
    await dbConnect();
    const event = await Event.findById(id);
    return event;
}

async function joinEvent(eventId, userId) {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
        console.log(`User with id=${userId} doesn't exist`);
    }

    const event = await Event.findByIdAndUpdate(eventId, { $addToSet: { attendees: user.id } });
    return event;
}

export {
    createEvent,
    getAllEvents,
    getEventById,
    joinEvent
}

