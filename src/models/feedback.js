import mongoose from "mongoose";
import { Schema } from "mongoose";

const feedback = new Schema({
	text: String,
	userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Feedback =
	mongoose.models.Feedback || mongoose.model("Feedback", feedback);

export default Feedback;
