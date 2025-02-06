import { redirect } from "next/navigation";
import { broadcastNotification } from "@/services/notification.service";
import { createNewTeam } from "@/services/team.service";
import { auth } from "../../../../auth";

export default async function NewTeamPage() {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "board") {
		redirect("/login");
	}

	return (
		<div>
			<p>New team page</p>
			<br />
			<br />
			<form
				action={async (formData) => {
					"use server";
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
					redirect("/teams");
				}}
			>
				<input required type="text" name="tname" placeholder="Team Name" />
				<br />
				<br />
				<textarea required name="description" placeholder="Team Description" />
				<br />
				<br />
				<button type="submit">Create new team</button>
			</form>
		</div>
	);
}
