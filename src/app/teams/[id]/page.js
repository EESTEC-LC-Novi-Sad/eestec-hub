import {
	getTeamById,
	joinTeam,
	getTeamApplicationById,
} from "@/services/team.service";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/services/user.service";

export default async function TeamByIdPage({ params }) {
	const session = await auth();
	const team = await getTeamById(params.id);

	return (
		<div>
			<h1>Team by id page</h1>
			<p>
				<b>Team name: </b>
				{team.name}
			</p>
			<p>
				<b>Team descripton: </b>
				{team.description}
			</p>
			<p>
				<b>Team members: </b>
				{team.teamMembers.map(async (applicationId, index) => {
					const application = await getTeamApplicationById(applicationId);
					if (application.status !== "joined") return;

					const member = await getUserById(application.memberId);
					return (
						<p
							key={index}
						>{`${member.email}${index !== team.teamMembers.length - 1 ? "," : ""}`}</p>
					);
				})}
			</p>

			<form
				action={async () => {
					"use server";
					const memberId = session.user.id;
					const teamId = params.id;

					await joinTeam(teamId, memberId);
					redirect("/teams");
				}}
			>
				<button>Join team</button>
			</form>
		</div>
	);
}
