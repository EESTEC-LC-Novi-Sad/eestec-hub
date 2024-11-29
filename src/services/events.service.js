import dbConnect from "@/app/lib/dbConnect";
import Event from "@/models/event";

/**
* @param {{name: String, description: String, startDate: Date, endDate: Date, location: String, code: String, attendees: []}} eventData
* */
async function createEvent(eventData) {
    await dbConnect();
    const event = Event.create({ ...eventData });
    return event;
}

async function getAllEvents() {
    await dbConnect();
    const events = Event.find();
    return events;
}

export {
    createEvent,
    getAllEvents
}

