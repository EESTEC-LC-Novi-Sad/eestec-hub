import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
	name: String,
	description: String,
	available: Boolean,
	coordinatorPositions: [String],
	pointsPerDay: Number,
	applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
});

const Project =
	mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
