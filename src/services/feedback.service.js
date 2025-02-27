"use server";

import dbConnect from "@/app/lib/dbConnect";
import Feedback from "@/models/feedback";

export async function sendFeedback(userId, feedbackText) {
	await dbConnect();
	const feedback = await Feedback.create({
		userId,
		text: feedbackText,
	});
	return feedback;
}
