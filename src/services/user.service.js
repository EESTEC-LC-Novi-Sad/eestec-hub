import * as bcrypt from "bcrypt";
import dbConnect from "@/app/lib/dbConnect";
import User from "../models/user";

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

async function getUserById(id) {
    await dbConnect();
    const user = await User.findById(id);
    return user;
}

/**
* @param {Object} userData 
* @param {String} userData.firstName
* @param {String} userData.lastName
* @param {String} userData.password
* @param {Date} userData.birthDate
* */
async function createUser(userData) {
    await dbConnect();
    const passHash = await bcrypt.hash(userData.password, 10);
    try {
        const user = await User.create({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthDate: userData.birthDate,
            password: passHash,
            dateCreated: new Date(Date.now()),
            role: 'member'
        });
        console.log(user);
        return user;
    }
    catch (error) {
        console.log("There was an error with creating new user entity: ", error);
        return null;
    }
}

export {
    getUserByEmail,
    getUserById,
    createUser
}
