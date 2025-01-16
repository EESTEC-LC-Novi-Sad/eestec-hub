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
* @property {Date} birthDate
* */


/**
* @param {String} email 
* */
async function getUserByEmail(email) {
    await dbConnect();
    try {
        const user = await User.findOne({ email })
        return user;
    }
    catch (error) {
        console.log("Error fetching user by email: ", error)
        return null;
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

/**
* @param {UserData} userData
* */
async function createUser(userData) {
    await dbConnect();
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
            role: 'member'
        });
        return user;
    }
    catch (error) {
        console.log("There was an error with creating new user entity: ", error);
        return null;
    }
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
    const user = await User.findById(userId);
    const notificationIds = user.notifications.map(n => n.notificationId);
    const notifications = await Notification.find({_id: { $in: notificationIds}}).lean();
    return notifications;
}

export {
    getUserByEmail,
    getUserById,
    getUserByUsername,
    createUser,
    getAllUserNotifications
}
