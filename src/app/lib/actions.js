"use server";

import { signOut } from "../../../auth";
import { put, del } from "@vercel/blob";
import { auth } from "../../../auth";
import { updateUser, getProfilePictureUri } from "../../services/user.service";
import { createProject } from "../../services/project.service";
import { broadcastNotification } from "../../services/notification.service";

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
