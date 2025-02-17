"use server";

import dbConnect from "@/app/lib/dbConnect";
import Event from "@/models/event";
import User from "@/models/user";
import { getUserByUsername } from "./user.service";

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
/**
 * @param {String} username
 * */
async function getAllEventsByUsername(username) {
	await dbConnect();
	try {
		const user = await getUserByUsername(username);
		const userEvents = await Event.find({
			attendees: user.id,
		});
		return userEvents;
	} catch (error) {
		console.error(error);
		return;
	}
}

async function getEventById(id) {
	try {
		await dbConnect();
		const event = await Event.findById(id);
		return event;
	} catch (e) {
		console.error(e);
		return null;
	}
}

async function joinEvent(eventId, userId) {
	await dbConnect();
	const user = await User.findById(userId);

	if (!user) {
		console.log(`User with id=${userId} doesn't exist`);
		return;
	}
	const event = await Event.findById(eventId);

	if (event.startDate > Date.now() || event.endDate < Date.now()) {
		return;
	}

	const updatedEvent = await Event.findByIdAndUpdate(eventId, {
		$addToSet: { attendees: user.id },
	});
	return updatedEvent;
}

export {
	createEvent,
	getAllEvents,
	getAllEventsByUsername,
	getEventById,
	joinEvent,
};
