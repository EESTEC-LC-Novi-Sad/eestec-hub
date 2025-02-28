"use server";

import * as bcrypt from "bcrypt";
import dbConnect from "@/app/lib/dbConnect";
import User from "../models/user";
import Notification from "../models/notification";

/**
 * @typedef {Object} UserData
 * @property {String} email
 * @property {String} username
 * @property {String} password
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} imageUri
 * @property {String} bio
 * @property {String} location
 * @property {String} socialUrl
 * @property {Date} birthDate
 * */

async function getAllUsers() {
	await dbConnect();
	const users = await User.find();
	return users;
}

/**
 * @param {String} email
 * */
async function getUserByEmail(email) {
	await dbConnect();
	try {
		const user = await User.findOne({ email });
		return user;
	} catch (error) {
		console.log("Error fetching user by email: ", error);
		return null;
	}
}

async function registerUser(userId) {
	try {
		await dbConnect();
		const user = await User.findByIdAndUpdate(
			userId,
			{ $set: { registered: true } },
			{ new: true },
		);
		return user;
	} catch (e) {
		console.error(e);
	}
}

async function getUserByUsername(username) {
	await dbConnect();
	const user = await User.findOne({ username });
	return user;
}

async function getUserById(id) {
	await dbConnect();
	const user = await User.findById(id);
	return user;
}

async function uploadProfilePicture(userId, imageUri) {
	await dbConnect();
	await User.findByIdAndUpdate(userId, { imageUri });
}

async function getProfilePictureUri(userId) {
	await dbConnect();
	const user = await User.findById(userId).select("imageUri");
	return user.imageUri;
}

/**
 * @param {UserData} userData
 * */
async function createUser(userData) {
	await dbConnect();
	const sameEmail = await User.findOne({ email: userData.email });
	if (sameEmail) {
		throw Error(
			`There is already an account with an email address "${userData.email}"`,
		);
	}

	const sameUsername = await User.findOne({ username: userData.username });
	if (sameUsername) {
		throw Error(
			`There is already an account with a username "${userData.username}"`,
		);
	}

	const passHash = await bcrypt.hash(userData.password, 10);
	try {
		const user = await User.create({
			email: userData.email,
			username: userData.username,
			firstName: userData.firstName,
			lastName: userData.lastName,
			birthDate: userData.birthDate,
			password: passHash,
			dateCreated: new Date(Date.now()),
			role: "member",
		});
		return user;
	} catch (error) {
		throw Error("There was an error with the database: ", error);
	}
}

async function changeUserPassword(userId, newPassword) {
	await dbConnect();
	const passHash = await bcrypt.hash(newPassword, 10);
	const user = await User.findByIdAndUpdate(userId, { password: passHash });
	return user;
}

/**
 * @param {UserData} userData
 * @param {ObjectId} userId
 * */
async function updateUser(userId, userData) {
	await dbConnect();
	const newUser = {
		email: userData.email,
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
		birthDate: userData.birthDate,
		location: userData.location,
		imageUri: userData.imageUri,
		bio: userData.bio,
		socialUrl: userData.socialUrl,
	};
	for (const key of Object.keys[newUser]) {
		if (
			newUser[key] === undefined ||
			newUser[key] === "" ||
			newUser[key] === null
		)
			delete newUser[key];
	}

	await User.findByIdAndUpdate(userId, newUser);
}

/**
 * @param {String} userRole
 * */
async function getUserByRole(userRole) {
	await dbConnect();
	const users = await User.find({ role: userRole });
	return users;
}

async function getAllUserNotifications(userId) {
	await dbConnect();
	const user = await User.findById(userId).select("notifications").lean();
	return user.notifications;
}

async function getNumOfNotifications(userId) {
	await dbConnect();
	const user = await User.findById(userId).select("notifications");
	return user.notifications.length;
}

export {
	getAllUsers,
	getUserByEmail,
	getUserById,
	getUserByUsername,
	getUserByRole,
	createUser,
	updateUser,
	getAllUserNotifications,
	getNumOfNotifications,
	uploadProfilePicture,
	getProfilePictureUri,
	registerUser,
	changeUserPassword,
};
