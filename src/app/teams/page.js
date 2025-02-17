import { getAllTeams } from "@/services/team.service";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Card from "../components/Card";
import Tag from "../components/Tag";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";

export default async function TeamsPage() {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}
	const isBoard = session.user.role === "board";

	const teams = await getAllTeams();
	return (
		<div className="flex flex-col items-center md:mt-4">
			{isBoard && (
				<Card className="bg-gray-100 w-full md:w-8/12 flex flex-col items-center">
					<LinkButton href="/teams/new">Create new team</LinkButton>
				</Card>
			)}
			<div className="md:border border-gray-300 md:rounded w-full md:w-8/12 divide-y divide-gray-300">
				{teams.map(mapTeamsToCards)}
			</div>
		</div>
	);
}

/**
 * @param {Number} index
 * @param {{name: String, description: String, teamMembers: ObjectId}} team
 * */
function mapTeamsToCards(team, index) {
	return (
		<div key={`team-${index}`} className="flex justify-between py-4">
			<div className="flex items-center">
				<Link
					className="text-blue-700 hover:underline mx-4"
					href={`/teams/${team.id}`}
				>
					{team.name}
				</Link>
				<Tag className="text-gray-600 border-gray-400">Member</Tag>
			</div>
			<div className="flex items-center">
				<Button className="mr-4">Settings</Button>
				<Button className="mr-4 text-red-600 hover:text-red-800">Leave</Button>
			</div>
		</div>
	);
}
