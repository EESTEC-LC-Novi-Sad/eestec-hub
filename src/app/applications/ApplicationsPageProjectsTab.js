import {
	setApplicationStatus,
	getApplicationById,
	getAllApplications,
} from "@/services/application.service";
import { sendNotificationById } from "@/services/notification.service";
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import { redirect } from "next/navigation";
import Link from "next/link";
import Tag from "../components/Tag";
import LinkButton from "../components/LinkButton";
import Button from "../components/Button";
import Image from "next/image";
import backupProfileImage from "../../images/profile.jpeg";
import TeamsIcon from "../icons/TeamsIcon";
import ProjectsIcon from "../icons/ProjectsIcon";

export default async function ApplicationsPageProjectsTab() {
	const applications = await getAllApplications();
	return (
		<div className="flex flex-col md:flex-row justify-center">
			<div className="mt-2 mb-2 md:mt-4 md:w-1/12 min-w-24 mr-2 flex justify-center md:justify-start md:flex-col gap-1">
				<LinkButton
					className="w-full bg-gray-200 border-b-2 md:border-l-2 md:border-b md:border-b-gray-400 md:border-l-blue-500 border-b-blue-500 flex items-center gap-1"
					href="#"
				>
					<ProjectsIcon width="18" height="18" />
					Projects
				</LinkButton>
				<LinkButton
					className="w-full flex items-center gap-1"
					href="/applications?tab=teams"
				>
					<TeamsIcon width="18" height="18" />
					Teams
				</LinkButton>
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
				<Image
					className="w-7 h-7 object-cover rounded-full mr-1"
					src={
						(member.imageUri === "removed" ? null : member.imageUri) ||
						backupProfileImage
					}
					width={50}
					height={50}
				/>
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

				<form
					action={async () => {
						"use server";

						await setApplicationStatus(application.id, "accepted");
						await sendNotificationById(member.id, {
							text: `Congratulations! You have been accepted to the ${project.name} project`,
							notificationType: "Application status",
							dateReceived: new Date(Date.now()),
							link: `/projects/${project.id}`,
						});
						redirect("/applications?tab=projects");
					}}
				>
					<Button
						type="submit"
						className="mr-1 text-green-700 border-green-700"
					>
						Accept
					</Button>
				</form>
				<form
					action={async () => {
						"use server";

						await setApplicationStatus(application.id, "rejected");
						await sendNotificationById(member.id, {
							text: `We are sorry! You have been rejected from the ${project.name} project`,
							notificationType: "Application status",
							dateReceived: new Date(Date.now()),
							link: `/projects/${project.id}`,
						});
						redirect("/applications?tab=projects");
					}}
				>
					<Button className="text-red-700 border-red-700">Reject</Button>
				</form>
			</div>
		</div>
	);
}
function getBgFromStatus(status) {
	if (!status) return "bg-yellow-100";
	if (status === "accepted") return "bg-green-200";
	if (status === "rejected") return "bg-red-200";
}
