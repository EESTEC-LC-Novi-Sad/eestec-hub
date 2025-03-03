"use server";

import dbConnect from "@/app/lib/dbConnect";
import Team from "@/models/team";
import TeamApplication from "@/models/teamApplication";
import { getUserByUsername, getUserById } from "./user.service";

async function joinTeam(teamId, memberId) {
	await dbConnect();
	if (!teamId || !memberId) {
		throw new Error("Missing teamId or memberId");
	}

	if (TeamApplication.exists({ teamId, memberId })) {
		throw new Error("You already applied to this team");
	}

	const app = await TeamApplication.create({
		teamId,
		memberId,
		status: "pending",
	});

	await Team.findByIdAndUpdate(teamId, { $addToSet: { teamMembers: app.id } });
}

async function getTeamMembers(teamId) {
	await dbConnect();
	const team = await getTeamById(teamId);
	const members = [];
	for (const applicationId of team.teamMembers) {
		const application = await getTeamApplicationById(applicationId);
		if (application.status !== "joined") continue;

		const member = await getUserById(application.memberId);
		if (!member) continue;
		members.push(member);
	}
	return members;
}

async function getAllTeamApplications() {
	await dbConnect();
	const applications = await TeamApplication.find();
	return applications;
}

async function getTeamApplicationById(id) {
	await dbConnect();
	const app = await TeamApplication.findById(id);
	return app;
}

/**
 * @param {String} username
 * */
async function getAllUserTeams(username) {
	try {
		await dbConnect();
		const user = await getUserByUsername(username);
		const userTeamApps = await TeamApplication.find({
			memberId: user.id,
			status: "joined",
		}).select("teamId");

		const teamIds = userTeamApps.map((app) => app.teamId);
		const userTeams = Team.find({
			_id: { $in: teamIds },
		});

		return userTeams;
	} catch (e) {
		console.error(e);
		return null;
	}
}

async function respondToTeamApplication(appId, status) {
	await TeamApplication.findByIdAndUpdate(appId, { $set: { status } });
}

async function getTeamById(id) {
	try {
		await dbConnect();
		const team = await Team.findById(id);
		return team;
	} catch (e) {
		console.error(e);
		return null;
	}
}

async function getAllTeams() {
	await dbConnect();
	const teams = await Team.find();
	return teams;
}

/**
 * @param {{name: String, description: String}} teamData
 * */
async function createNewTeam(teamData) {
	await dbConnect();
	const team = await Team.create({ ...teamData });
	return team;
}

export {
	getAllTeams,
	getTeamMembers,
	createNewTeam,
	getTeamById,
	getAllUserTeams,
	joinTeam,
	getAllTeamApplications,
	respondToTeamApplication,
	getTeamApplicationById,
};
