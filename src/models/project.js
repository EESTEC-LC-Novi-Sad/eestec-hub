import mongoose from "mongoose";
import { Schema } from "mongoose";

const project = new Schema({
    name: String,
    description: String,
    coordinatorPositions: [String],
});

const Project = mongoose.models.Project || mongoose.model('Project', project);

export default Project;
