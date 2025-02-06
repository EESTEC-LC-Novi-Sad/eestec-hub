import mongoose from "mongoose";
import { Schema } from "mongoose";

const teamSchema = new Schema({
	name: String,
	description: String,
	teamMembers: [{ type: Schema.Types.ObjectId, ref: "TeamApplication" }],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
