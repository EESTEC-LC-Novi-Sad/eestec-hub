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
* @param {String} userRole
* */
async function multicastNotification(notificationData, userRole) {
    await dbConnect();
    const notification = await createNotification(notificationData);
    console.log(notification);

    await User.updateMany(
        { role: userRole },
        { $push: { notifications: { notificationId: notification.id, isRead: false } } }
    );
}

async function getNotificationById(id) {
    await dbConnect();
    const notification = await Notification.findById(id);
    return notification;
}

export {
    multicastNotification,
    getNotificationById
}

