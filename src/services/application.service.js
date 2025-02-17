"use server";

import dbConnect from "@/app/lib/dbConnect";
import Application from "@/models/application";
import { getUserByUsername } from "./user.service";

async function getAllApplications() {
	await dbConnect();
	const applications = await Application.find();
	return applications;
}

async function getApplicationById(id) {
	try {
		await dbConnect();
		const application = await Application.findById(id);
		return application;
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 * @param {String} username
 * */
async function getApplicationByUsername(username) {
	await dbConnect();
	const user = await getUserByUsername(username);
	const userApplications = await Application.find({
		memberId: user.id,
	});

	return userApplications;
}

async function setApplicationStatus(id, status) {
	await dbConnect();
	await Application.findByIdAndUpdate(id, {
		$set: { status: status, responseDate: new Date(Date.now()) },
	});
}

export {
	getAllApplications,
	getApplicationById,
	getApplicationByUsername,
	setApplicationStatus,
};
