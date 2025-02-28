import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	firstName: String,
	lastName: String,
	bio: String,
	birthDate: Date,
	password: String,
	dateCreated: Date,
	role: String,
	imageUri: String,
	location: String,
	socialUrl: String,
	registered: Boolean,
	points: Number,
	notifications: [
		{
			text: String,
			notificationType: String,
			link: String,
		},
	],
});

const User = mongoose.models.User || mongoose.model("User", user);

export default User;
