import Notification from "../models/notification";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/user";

/**
* @param {Object} notificationData
* @param {String} notificationData.text
* */
async function createNotification(notificationData) {
    await dbConnect();
    const notification = await Notification.create({ ...notificationData });
    return notification;
}

/**
* @param {Object} notificationData
* @param {String} notificationData.text
* @param {String} userId 
* */
async function sendNotificationById(userId, notificationData) {
    await dbConnect();
    const notification = await createNotification(notificationData);
    await User.findByIdAndUpdate(
        userId,
        { $push: { notifications: { notificationId: notification.id, isRead: false } } }
    );
}

/**
* @param {Object} notificationData
* @param {String} notificationData.text
* */
async function broadcastNotification(notificationData) {
    await dbConnect();
    const notification = await createNotification(notificationData);

    await User.updateMany(
        {},
        { $push: { notifications: { notificationId: notification.id, isRead: false } } }
    );
}
/**
* @param {Object} notificationData
* @param {String} notificationData.text
* @param {String} userRole
* */
async function multicastNotification(notificationData, userRole) {
    await dbConnect();
    const notification = await createNotification(notificationData);

    await User.updateMany(
        { role: userRole },
        { $push: { notifications: { notificationId: notification.id, isRead: false } } }
    );
}

/**
* @param {String} id 
* */
async function getNotificationById(id) {
    await dbConnect();
    const notification = await Notification.findById(id);
    return notification;
}

export {
    sendNotificationById,
    broadcastNotification,
    multicastNotification,
    getNotificationById
}

