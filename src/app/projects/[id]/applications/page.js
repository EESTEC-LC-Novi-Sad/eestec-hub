import Link from "next/link";
import {
	getApplicationsForProject,
	getProjectById,
} from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import Tag from "@/app/components/Tag";
import LinkButton from "@/app/components/LinkButton";
import Button from "@/app/components/Button";
import { Separator } from "@/app/lib/utils";

export default async function ProjectApplicationsPage({ params }) {
	const applications = await getApplicationsForProject(params.id);
	const project = await getProjectById(params.id);

	return (
		<div className="flex flex-col items-center px-2">
			<div className="text-left w-full md:w-8/12">
				<h1 className="text-2xl">
					<b>Applications for &quot;{project.name}&quot;</b>
				</h1>
				<Separator />
			</div>
			<div className="w-full md:w-8/12 divide-y divide-gray-400 md:border md:mt-4 md:rounded border-gray-400">
				{!applications || applications.length === 0 ? (
					<p>No applications found.</p>
				) : (
					applications.map(mapApplicationToCard)
				)}
			</div>
		</div>
	);
}

async function mapApplicationToCard(application, index) {
	const member = await getUserById(application.memberId);
	const project = await getProjectById(application.projectId);
	return (
		<div key={`application-${index}`} className="md:flex justify-between p-2">
			<div className="flex flex-wrap mb-1 md:mb-0 items-center">
				<Link
					href={`/profile/${encodeURI(member.username)}`}
					className="text-blue-700 hover:underline mr-1"
				>
					{member.username}
				</Link>
				<p className="mr-1">
					has applied for
					{application.position ? ` ${application.position} @` : " "}
				</p>
				<Link
					href={`/projects/${project.id}`}
					className="text-blue-700 hover:underline mr-1"
				>
					{project.name}
				</Link>
				<Tag
					className={`w-fit mb-2 md:mb-0 flex items-center hidden md:block border-gray-300
                        ${getBgFromStatus(application.status)} `}
				>
					{application.status ? application.status : "pending"}
				</Tag>
			</div>
			<Tag
				className={`w-fit mb-2 md:mb-0 flex items-center md:hidden border-gray-300
                    ${getBgFromStatus(application.status)} `}
			>
				{application.status ? application.status : "pending"}
			</Tag>
			<div className="flex items-center">
				<LinkButton href={`/applications/${application.id}`} className="mr-1">
					View
				</LinkButton>
				<Button className="mr-1 text-green-700">Accept</Button>
				<Button className="text-red-700">Reject</Button>
			</div>
		</div>
	);
}
function getBgFromStatus(status) {
	if (!status) return "bg-yellow-100";
	if (status === "accepted") return "bg-green-200";
	if (status === "rejected") return "bg-red-200";
}
