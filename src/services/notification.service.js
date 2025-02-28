"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/user";

/**
 * @typedef Notification
 * @property {String} text
 * @property {String} link
 * @property {String} notificationType
 * */

/**
 * @param {Notification} notificationData
 * */
async function sendNotificationById(userId, notificationData) {
	await dbConnect();
	await User.findByIdAndUpdate(userId, {
		$push: {
			notifications: { ...notificationData },
		},
	});
}

/**
 * @param {Notification} notificationData
 * */
async function broadcastNotification(notificationData) {
	await dbConnect();
	await User.updateMany(
		{},
		{
			$push: {
				notifications: { ...notificationData },
			},
		},
	);
}
/**
 * @param {Notification} notificationData
 * @param {String} userRole
 * */
async function multicastNotification(notificationData, userRole) {
	await dbConnect();

	await User.updateMany(
		{ role: userRole },
		{
			$push: {
				notifications: { ...notificationData },
			},
		},
	);
}

/**
 * @param {ObjectId} userId
 * @param {[ObjectId]} notificationIds
 * */
async function removeNotificationForUser(userId, notificationIds) {
	await dbConnect();
	await User.findByIdAndUpdate(
		userId,
		{
			$pull: { notifications: { _id: { $in: notificationIds } } },
		},
		{ new: true },
	);
}

export {
	sendNotificationById,
	broadcastNotification,
	multicastNotification,
	removeNotificationForUser,
};
