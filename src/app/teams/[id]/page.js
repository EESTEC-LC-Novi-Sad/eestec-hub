import {
	getTeamById,
	joinTeam,
	getTeamApplicationById,
	getTeamMembers,
} from "@/services/team.service";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/services/user.service";
import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";
import Image from "next/image";
import Link from "next/link";
import backupProfileImage from "../../../images/profile.jpeg";
import TeamsIcon from "../../icons/TeamsIcon";

export default async function TeamByIdPage({ params }) {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}
	const team = await getTeamById(params.id);
	if (!team) {
		return (
			<div className="flex justify-center px-2">
				<h1 className="text-2xl mt-4">Team is missing</h1>
			</div>
		);
	}
	const teamMembers = await getTeamMembers(params.id);

	return (
		<div className="flex justify-center px-2">
			<div className="w-full md:w-6/12">
				<h1 className="text-3xl my-2">
					<b>{team.name}</b>
				</h1>
				<Separator />
				<p className="text-lg">{team.description}</p>
				<Separator />
				<div>
					<p className="text-sm flex items-center gap-1 mb-2">
						<TeamsIcon className="text-gray-600" />
						<b>Team members </b>
						<span className="rounded-full bg-gray-500 px-2 text-white">
							{teamMembers.length}
						</span>
					</p>
					<div className="flex items-center gap-2 flex-wrap">
						{teamMembers.map((member) => {
							return (
								<Link
									key={member.id}
									href={`/profile/${encodeURI(member.username)}`}
								>
									<Image
										className="w-7 h-7 object-cover rounded-full"
										title={member.username}
										src={
											(member.imageUri === "removed"
												? null
												: member.imageUri) || backupProfileImage
										}
										width={50}
										height={50}
									/>
								</Link>
							);
						})}
					</div>
				</div>

				<form
					className="w-full flex flex-row-reverse"
					action={async () => {
						"use server";
						const memberId = session.user.id;
						const teamId = params.id;

						await joinTeam(teamId, memberId);
						redirect("/teams");
					}}
				>
					<Button
						className="md:w-20 text-green-700 border-green-700 mt-4 w-full"
						type="submit"
					>
						Join
					</Button>
				</form>
			</div>
		</div>
	);
}
