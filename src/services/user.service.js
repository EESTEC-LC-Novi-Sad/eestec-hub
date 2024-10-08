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

export {
    getUserByEmail
}
