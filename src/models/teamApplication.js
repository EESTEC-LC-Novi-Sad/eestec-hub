import mongoose from "mongoose";
import { Schema } from "mongoose";

export const teamApplicationSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    memberId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: String,
    responseDate: Date
});

const TeamApplication = mongoose.models.TeamApplication
    || mongoose.model('TeamApplication', teamApplicationSchema);

export default TeamApplication;


