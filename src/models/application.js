import mongoose from "mongoose";
import { Schema } from "mongoose";

export const applicationSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    memberId: { type: Schema.Types.ObjectId, ref: 'User' },
    motivationalLetter: String,
    position: String
});

const Application = mongoose.models.Application
    || mongoose.model('Application', applicationSchema);

export default Application;
