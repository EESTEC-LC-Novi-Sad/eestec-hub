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
            socialUrl: userData.socialUrl
        };
    Object.keys(newUser).forEach((key) => 
        (newUser[key] === undefined || newUser[key] === "" || newUser[key] === null) 
        && delete newUser[key]);

    await User.findByIdAndUpdate(
        userId,
        newUser
    );
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

async function getNumOfNotifications(userId) {
    await dbConnect();
    const user = await User.findById(userId);
    const notificationIds = user.notifications.map(n => n.notificationId);
    const numOfNotifications = await Notification.find({_id: { $in: notificationIds}}).countDocuments();
    return numOfNotifications;
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
    getProfilePictureUri
}
