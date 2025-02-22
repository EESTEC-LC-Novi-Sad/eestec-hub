import mongoose from "mongoose";
import { Schema } from "mongoose";

const passwordResetToken = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	token: { type: String, required: true },
	expiresAt: { type: Date, required: true },
	used: { type: Boolean, required: true, default: false },
});

const PasswordResetToken =
	mongoose.models.PasswordResetToken ||
	mongoose.model("PasswordResetToken", passwordResetToken);

export default PasswordResetToken;
