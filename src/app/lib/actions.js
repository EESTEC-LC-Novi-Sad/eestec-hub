"use server";

import { signOut } from "../../../auth";
import { put, del } from "@vercel/blob";
import { auth } from "../../../auth";
import {
	updateUser,
	createUser,
	getProfilePictureUri,
	getUserByEmail,
	registerUser,
	changeUserPassword,
} from "../../services/user.service";
import { createProject } from "../../services/project.service";
import { broadcastNotification } from "../../services/notification.service";
import { createNewTeam } from "../../services/team.service";
import { createEvent, joinEvent } from "../../services/events.service";
import nodemailer from "nodemailer";
import {
	createPasswordToken,
	getValidPasswordToken,
	invalidatePasswordToken,
} from "@/services/passwordToken.service";
import { redirect } from "next/navigation";

export async function logOut() {
	await signOut();
}

export async function uploadBlob(file) {
	const blob = await put(file.name, file, { access: "public" });
	return blob.url;
}

export async function registerUserAction(prevState, formData) {
	try {
		const userId = formData.get("userId");
		const user = await registerUser(userId);
		if (!user) return { error: "Failed to register user!" };
		return { success: "User successfully registered!" };
	} catch (err) {
		console.error("Error while registering user: ", err);
		return { error: "Failed to register user!" };
	}
}

export async function signUpAction(prevState, formData) {
	try {
		const password = formData.get("password");
		const rpassword = formData.get("rpassword");
		const email = formData.get("email");
		const username = formData.get("username");
		const fname = formData.get("fname");
		const lname = formData.get("lname");
		const birth = formData.get("birth");

		if (password !== rpassword) {
			return { error: "Passwords do not match!" };
		}

		if (password.length < 8) {
			return { error: "Password must be at least 8 characters long!" };
		}

		if (username.includes(" ")) {
			return { error: "Username must not contain spaces!" };
		}

		if (username.length < 4) {
			return { error: "Username must be at least 4 characters long!" };
		}

		if (fname.includes(" ")) {
			return { error: "First name must not contain spaces!" };
		}

		if (lname.includes(" ")) {
			return { error: "Last name must not contain spaces!" };
		}

		if (fname.length < 2) {
			return { error: "First name must be at least 2 characters long!" };
		}

		if (lname.length < 2) {
			return { error: "Last name must be at least 2 characters long!" };
		}

		const userData = {
			email,
			username,
			firstName: fname,
			lastName: lname,
			birthDate: new Date(birth),
			password,
			rpassword,
		};

		const newUser = await createUser(userData);
		if (newUser) {
			return {
				success:
					"Successfully sent a signup request! Now wait until the board registers your account to log in.",
			};
		}
	} catch (err) {
		console.error(err);
		return {
			error: "ERROR: Couldn't sign you up! Check if the fields are valid",
		};
	}

	return {
		error: "ERROR: Couldn't sign you up! Check if the fields are valid",
	};
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

export async function sendResetPasswordEmail(prevState, formData) {
	try {
		const email = formData.get("email");
		const user = await getUserByEmail(email);
		if (!user) {
			return { error: "User with that email does not exist!" };
		}
		const token = await createPasswordToken(user.id);
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.SMTP_MAIL,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		const info = await transporter.sendMail({
			from: '"Mihailo Vojinović" <mihailo.vojinovic@eestecns.org>',
			to: email,
			subject: "EESTEC Hub - Password reset",
			html: `<h1>Reset your password</h1> 
                <p>
                    Enter this link to reset your password: 
                    <a href="https://eestec-hub.vercel.app/password-reset/token/${token}">https://eestec-hub.vercel.app/password-reset/token/${token}</a>
                </p>`,
		});
		return { success: "Email sent!" };
	} catch (err) {
		console.error(err);
		return { error: "Failed to send email!" };
	}
}

export async function resetPassword(prevState, formData) {
	try {
		const token = formData.get("token");
		const password = formData.get("password");
		const rpassword = formData.get("rpassword");
		if (password !== rpassword) {
			return { error: "Passwords do not match!" };
		}
		const passwordToken = await getValidPasswordToken(token);
		if (!passwordToken) {
			return { error: "Invalid token!" };
		}
		await changeUserPassword(passwordToken.userId, password);
		await invalidatePasswordToken(token);
		return { success: "Password successfully reset!" };
	} catch (err) {
		console.error(err);
		return { error: "Failed to reset password!" };
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

export async function joinEventFormAction(prevState, formData) {
	try {
		const code = Number(formData.get("code"));
		const eventId = formData.get("eventId");
		const userId = formData.get("userId");
		const eventCode = Number(formData.get("eventCode"));
		if (!code || !eventCode) {
			return { error: "Not a valid number" };
		}
		if (eventCode !== code) {
			return { error: "Invalid event code!" };
		}

		const res = await joinEvent(eventId, userId);
		return res;
	} catch (err) {
		console.error("Error while joining event: ", err);
		return { error: "ERROR: Failed to join event!" };
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
