"use server";

import dbConnect from "@/app/lib/dbConnect";
import PasswordResetToken from "@/models/passwordResetToken";
import crypto from "node:crypto";

async function getValidPasswordToken(token) {
	try {
		await dbConnect();
		const passwordToken = await PasswordResetToken.findOne({ token });
		if (!passwordToken) return null;
		if (passwordToken.expiresAt < new Date()) {
			await PasswordResetToken.deleteOne({ id: passwordToken.id });
			return null;
		}

		return passwordToken;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {import("mongoose").ObjectId} userId
 */
async function createPasswordToken(userId) {
	await dbConnect();
	const token = crypto.randomBytes(48).toString("hex");

	const passwordToken = await PasswordResetToken.create({
		userId,
		token,
		expiresAt: new Date(Date.now() + 1000 * 60 * 10),
	});

	return passwordToken.token;
}

async function invalidatePasswordToken(token) {
	await dbConnect();
	await PasswordResetToken.deleteOne({ token });
}

export { getValidPasswordToken, createPasswordToken, invalidatePasswordToken };
