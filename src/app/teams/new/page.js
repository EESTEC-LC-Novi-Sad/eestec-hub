import { redirect } from "next/navigation";
import { broadcastNotification } from "@/services/notification.service";
import { createNewTeam } from "@/services/team.service";
import { auth } from "../../../../auth";
import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";

export default async function NewTeamPage() {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "board") {
		redirect("/login");
	}

	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">
					<b>Create a new team</b>
				</h1>
				<p className="text-gray-600">
					All your members will be able to see and apply to this team. You will
					be able to see their applications in the applications page!
				</p>
				<Separator />
				<p className="mb-4">
					<i>Required fields are marked with an asterix (*)</i>
				</p>
				<form
					className="inline-flex flex-col w-full"
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
					<label htmlFor="tname">
						<b>Team name*</b>
					</label>
					<input
						className="border h-9 rounded border-gray-300 mb-4"
						required
						type="text"
						name="tname"
					/>
					<label htmlFor="description">
						<b>Description*</b>
					</label>
					<textarea
						className="border rounded border-gray-300 mb-4"
						required
						name="description"
					/>
					<div className="flex flex-row-reverse">
						<Button className="w-full md:w-64 mt-4" type="submit">
							Create a new team
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
