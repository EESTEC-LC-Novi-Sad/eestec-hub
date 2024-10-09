import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    email: String,
    password: String,
    dateCreated: String,
    role: String
});

const User = mongoose.models.User || mongoose.model('User', user);

export default User;
