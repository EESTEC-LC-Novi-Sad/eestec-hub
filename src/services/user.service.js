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

/**
* @param {String} email 
* @param {String} password 
* */
async function createUser(email, password) {
    await dbConnect();
    try {
        const user = await User.create({
            email: email,
            password: password,
            dateCreated: Date.now().toString()
        });
        return user;
    }
    catch (error) {
        console.log("There was an error with creating new user entity: ", error);
        return null;
    }
}

export {
    getUserByEmail,
    createUser
}
