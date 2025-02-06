"use server";

import Project from "@/models/project";
import dbConnect from "@/app/lib/dbConnect";
import Application from "@/models/application";
import { auth } from "../../auth";
import { getUserByUsername } from "./user.service";

/**
 * @param {Object} projectData
 * @param {String} projectData.name
 * @param {String} projectData.description
 * */
async function createProject(projectData) {
	await dbConnect();
	const project = await Project.create({ ...projectData });
	return project;
}

async function getAllProjects() {
	await dbConnect();
	const projects = await Project.find();
	return projects;
}

/**
 * @param {String} username
 * */
async function getAllProjectsByUsername(username) {
	await dbConnect();
	try {
		const user = await getUserByUsername(username);
		const acceptedApplications = await Application.find({
			memberId: user.id,
			status: "accepted",
		}).select("projectId");

		const projectIds = acceptedApplications.map((app) => app.projectId);

		const projects = await Project.find({
			_id: { $in: projectIds },
		});

		return projects;
	} catch (error) {
		console.error(error);
		return;
	}
}

async function getProjectsCount() {
	await dbConnect();
	const count = Project.countDocuments({});
	return count;
}

async function getProjectById(id) {
	await dbConnect();
	const project = await Project.findById(id);
	return project;
}

async function applyToProject(projectId, applicationData) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			throw new Error("User must be logged in to apply!");
		}
		await dbConnect();

		const { motivationalLetter, position } = applicationData;

		const newApplication = await Application.create({
			memberId: session.user.id,
			projectId,
			motivationalLetter,
			position,
		});

		await Project.findByIdAndUpdate(
			projectId,
			{ $push: { applications: newApplication.id } },
			{ new: true },
		);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

async function getApplicationsForProject(projectId) {
	await dbConnect();
	const applications = Application.find({ projectId });
	return applications;
}

export {
	getAllProjects,
	getProjectById,
	getApplicationsForProject,
	getAllProjectsByUsername,
	createProject,
	applyToProject,
	getProjectsCount,
};
