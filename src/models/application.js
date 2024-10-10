import mongoose from "mongoose";
import { Schema } from "mongoose";

export const applicationSchema = new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'User' },
    motivationalLetter: String
});

const Application = mongoose.models.Application
    || mongoose.model('Application', applicationSchema);

export default Application;
