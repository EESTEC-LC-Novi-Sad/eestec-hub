import mongoose from "mongoose";
import { Schema } from "mongoose";

const eventSchema = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    code: String,
    attendees: [{type: Schema.Types.ObjectId, ref: "User"}]
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
