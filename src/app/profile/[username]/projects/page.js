import { getAllProjectsByUsername } from "@/services/project.service";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import Card from "@/app/components/Card";
import LinkButton from "@/app/components/LinkButton";
import Tag from "@/app/components/Tag";
import { trimProjectDescription } from "@/app/lib/utils";

export default async function UserProjectPage({ params }) {
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
	const userProjects = await getAllProjectsByUsername(username);

	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-7/12">
				<h1 className="text-2xl ml-2">
					<b>Your projects</b>
				</h1>
				{!userProjects || userProjects.length === 0 ? (
					<p>You have no projects currently</p>
				) : (
					userProjects.map(mapProjectToCard)
				)}
			</div>
		</div>
	);
}

/**
 * @param {Number} index
 * @param {{_id: ObjectId, name: String, description: String, available: Boolean, coordinatorPositions: [String], applications: [ObjectId]}} project
 * */
function mapProjectToCard(project, index) {
	return (
		<Link key={`proj-${index}`} href={`/projects/${project.id}`}>
			<Card className="hover:bg-gray-100 max-w-4xl">
				<div className="md:flex justify-between">
					<p className="text-xl mr-1">
						<b>{project.name}</b>
					</p>
					<p className="text-sm text-gray-800">
						created on {project._id.getTimestamp().toDateString()}
					</p>
				</div>
				<p>{trimProjectDescription(project.description, 100)}</p>
				<div className="flex flex-wrap mt-2 text-gray-700">
					{project.coordinatorPositions.map((pos, index) => {
						return (
							<Tag key={`coor-${index}`} className="mr-2 mt-2">
								{pos}
							</Tag>
						);
					})}
				</div>
			</Card>
		</Link>
	);
}
