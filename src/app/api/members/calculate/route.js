import { getAllUsers } from "../../../../services/user.service";
import { getAllProjects } from "../../../../services/project.service";
import { getApplicationById } from "../../../../services/application.service";
import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";

// Calculates daily points for each user
export async function GET(req) {
	if (
		req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
	) {
		return new Response("Unauthorized", {
			status: 401,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	}

	await dbConnect();

	const session = await mongoose.startSession();
	let message;

	try {
		await session.withTransaction(async () => {
			// Get all the projects
			const projects = await mongoose.models.Project.find()
				.session(session)
				.lean();
			let bulkOps = [];
			for (const project of projects) {
				if (!project.pointsPerDay) {
					continue;
				}

				const applications = await mongoose.models.Application.find({
					projectId: project._id,
					status: "accepted",
				})
					.session(session)
					.lean();

				bulkOps = applications.map((app) => ({
					updateOne: {
						filter: { _id: app.memberId },
						update: { $inc: { points: project.pointsPerDay } },
					},
				}));
			}
			bulkOps.push({
				updateMany: {
					filter: { role: "board" },
					update: { $inc: { points: 0.5 } },
				},
			});

			if (bulkOps.length > 0) {
				const result = await mongoose.models.User.bulkWrite(bulkOps, {
					session,
				});
			}
		});
		message = "Successfuly added points to users";
	} catch (error) {
		await session.abortTransaction();
		message = `Error calculating points: ${error.message}`;
		return new Response(message, {
			status: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} finally {
		await session.endSession();
	}
	return new Response(message, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
