import {
	setApplicationStatus,
	getApplicationById,
} from "@/services/application.service";
import { sendNotificationById } from "@/services/notification.service";
import { getProjectById } from "@/services/project.service";
import { getUserById } from "@/services/user.service";
import { redirect } from "next/navigation";
import backupProfileImage from "../../../images/profile.jpeg";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";
import { Separator } from "@/app/lib/utils";

export default async function ApplicationPage({ params }) {
	const application = await getApplicationById(params.id);
	if (!application) {
		return (
			<div className="flex justify-center px-2 pt-2">
				<h1 className="text-2xl mt-4">Application not found</h1>
			</div>
		);
	}
	const member = await getUserById(application.memberId);
	if (!member) {
		return (
			<div className="flex justify-center px-2 pt-2">
				<h1 className="text-2xl mt-4">Member not found</h1>
			</div>
		);
	}
	const project = await getProjectById(application.projectId);
	if (!project) {
		return (
			<div className="flex justify-center px-2 pt-2">
				<h1 className="text-2xl mt-4">Member not found</h1>
			</div>
		);
	}
	return (
		<div className="flex justify-center px-2 pt-2">
			<div className="w-full md:w-7/12">
				<div className="flex flex-wrap gap-2 items-center text-2xl">
					<Image
						className="w-7 h-7 object-cover rounded-full"
						src={
							(member.imageUri === "removed" ? null : member.imageUri) ||
							backupProfileImage
						}
						width={50}
						height={50}
					/>
					<Link
						href={`/profile/${encodeURI(member.username)}`}
						className="text-blue-700 hover:underline"
					>
						{member.username}
					</Link>
					<span>is applying for</span>
					<Link
						className="text-blue-700 hover:underline"
						href={`/projects/${project.id}`}
					>
						{project.name}
					</Link>
				</div>
				<Separator />
				{application.position && (
					<div>
						<span className="text-gray-700">
							{`Position: ${application.position}`}
						</span>
					</div>
				)}
				<p className="text-lg mt-4">
					<b>Motivational letter</b>
				</p>
				<p className="border px-2 py-1 mb-4">
					{application.motivationalLetter}
				</p>
				<div className="md:flex gap-2 flex-row-reverse">
					<form
						action={async () => {
							"use server";

							await setApplicationStatus(params.id, "accepted");
							await sendNotificationById(member.id, {
								text: `Congratulations! You have been accepted to the ${project.name} project`,
								notificationType: "Application status",
								dateReceived: new Date(Date.now()),
								link: `/projects/${project.id}`,
							});
							redirect("/applications");
						}}
					>
						<Button
							className="w-full md:w-fit mb-2 text-green-700 border-green-700"
							type="submit"
						>
							Accept
						</Button>
					</form>
					<form
						action={async () => {
							"use server";

							await setApplicationStatus(params.id, "rejected");
							await sendNotificationById(member.id, {
								text: `We are sorry! You have been rejected from the ${project.name} project`,
								notificationType: "Application status",
								dateReceived: new Date(Date.now()),
								link: `/projects/${project.id}`,
							});
							redirect("/applications");
						}}
					>
						<Button
							className="w-full md:w-fit text-red-600 border-red-600"
							type="submit"
						>
							Reject
						</Button>
					</form>
				</div>
			</div>
		</div>
	);

	//TODO: make accept and decline buttons work! Before that, alter project model to hold this info
}
