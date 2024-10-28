import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema({
    text: String,
    notificationType: String,
    dateReceived: Date,
    link: String,
});

const Notification = mongoose.models.Notification
    || mongoose.model('Notification', notificationSchema);

export default Notification;
