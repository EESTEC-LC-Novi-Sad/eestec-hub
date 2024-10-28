import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    password: String,
    dateCreated: Date,
    role: String,
    notifications: [
        {
            notificationId: { type: Schema.Types.ObjectId, ref: "Notification" },
            isRead: Boolean
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', user);

export default User;
