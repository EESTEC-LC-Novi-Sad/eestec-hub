"use server";

import { signOut } from "../../../auth";
import { put, del } from "@vercel/blob";
import { auth } from "../../../auth";
import { updateUser, getProfilePictureUri } from "../../services/user.service";
import { createProject } from "../../services/project.service";
import { broadcastNotification } from "../../services/notification.service";
import { createNewTeam } from "../../services/team.service";
import { createEvent } from "../../services/events.service";

export async function logOut() {
	await signOut();
}

export async function uploadBlob(file) {
	const blob = await put(file.name, file, { access: "public" });
	return blob.url;
}

/**
 * @param {FormData} formData
 * @param {any} prevState
 * */
export async function updateProfile(prevState, formData) {
	const session = await auth();
	if (!session || !session.user) {
		return { error: "Unauthorized" };
	}

	try {
		const userId = session.user.id;
		const imageFile = formData.get("imageFile");
		let imageUri;

		if (imageFile === "removed") {
			imageUri = "removed";
			const uriToRemove = await getProfilePictureUri(userId);
			if (uriToRemove !== "removed") {
				await del(uriToRemove);
			}
		} else {
			imageUri = imageFile ? await uploadBlob(imageFile) : null;
		}

		const firstName = formData.get("fname");
		const lastName = formData.get("lname");
		const location = formData.get("location");
		const birthDate = new Date(formData.get("birthday"));
		const bio = formData.get("bio");
		const socialUrl = formData.get("social");

		await updateUser(userId, {
			firstName,
			lastName,
			bio,
			socialUrl,
			imageUri,
			location,
			birthDate,
		});
		return { success: "Profile updated!" };
	} catch (err) {
		console.error("Error parsing form data: ", err);
		return { error: "Profile update failed!" };
	}
}

/**
 * @param {FormData} formData
 * @param {any} prevState
 * */
export async function createNewProject(prevState, formData) {
	console.log("formData: ", formData);
	try {
		const projectData = {
			name: formData.get("pname"),
			description: formData.get("description"),
			coordinatorPositions: JSON.parse(formData.get("coordinators")),
			applications: [],
		};

		const proj = await createProject(projectData);
		await broadcastNotification({
			text: `New project is available: ${formData.get("pname")}`,
			notificationType: "New projects",
			dateReceived: new Date(Date.now()),
			link: `/projects/${proj.id}`,
		});
		return { success: "New project successfully created!" };
	} catch (err) {
		console.error("Error while creating new profile: ", err);
		return { error: "Failed to create new project!" };
	}
}

/**
 * @param {FormData} formData
 * @param {any} prevState
 * */
export async function createNewTeamAction(precState, formData) {
	try {
		const teamData = {
			name: formData.get("tname"),
			description: formData.get("description"),
		};

		const newTeam = await createNewTeam(teamData);
		broadcastNotification({
			text: `New team has been created: ${newTeam.name}`,
			notificationType: "New team",
			dateReceived: new Date(Date.now()),
			link: `/teams/${newTeam.id}`,
		});
		return { success: `Successfuly created team "${teamData.name}"!` };
	} catch (err) {
		console.error("Error while creating a new team", err);
		return { error: "Failed to create a new team!" };
	}
}

export async function createNewEvent(prevState, formData) {
	try {
		const eventData = {
			name: formData.get("ename"),
			description: formData.get("description"),
			startDate: formData.get("start-date"),
			endDate: formData.get("end-date"),
			location: formData.get("location"),
			pointsPerAttend: formData.get("points"),
			attendees: [],
		};
		const event = await createEvent(eventData);
		broadcastNotification({
			text: `New event: ${eventData.name} at ${(new Date(eventData.startDate)).toDateString()}`,
			notificationType: "New events",
			dateReceived: new Date(Date.now()),
			link: `/events/${event.id}`,
		});
		return { success: "Successfuly created a new event!" };
	} catch (err) {
		console.error(err);
		return { error: "Failed to create a new event!" };
	}
}
