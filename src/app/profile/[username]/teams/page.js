import { getAllUserTeams } from "@/services/team.service";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Tag from "../../../components/Tag";
import Button from "../../../components/Button";

export default async function UserTeamsPage({ params }) {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}

	const { username } = params;
	if (session.user.username !== username) {
		return (
			<div className="flex justify-center">
				<h1 className="text-2xl mt-4">You are not allowed on this page</h1>
			</div>
		);
	}
	const userTeams = await getAllUserTeams(username);

	return (
		<div className="flex justify-center">
			<div className="w-full md:w-8/12">
				<h1 className="text-2xl ml-2 mb-4">
					<b>Your teams</b>
				</h1>
				<div className="border border-gray-300 md:rounded  divide-y divide-gray-300 mb-4">
					<div>
						{!userTeams || userTeams.length === 0 ? (
							<p>You are not in any teams</p>
						) : (
							userTeams.map(mapTeamsToCards)
						)}
					</div>
				</div>
				<Link href="/teams/" className="text-blue-700 hover:underline mx-4">
					Join more teams
				</Link>
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
