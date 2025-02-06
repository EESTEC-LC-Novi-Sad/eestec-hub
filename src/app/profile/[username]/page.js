import { getUserByUsername } from "@/services/user.service";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import backupProfileImage from "../../../images/profile.jpeg";
import Button from "../../components/Button";
import LinkButton from "../../components/LinkButton";
import LocationIcon from "@/app/icons/LocationIcon";
import CakeIcon from "@/app/icons/CakeIcon";
import { getAllProjectsByUsername } from "@/services/project.service";
import { getAllEventsByUsername } from "@/services/events.service";
import Link from "next/link";
import { trimProjectDescription } from "../../lib/utils";
import Tag from "@/app/components/Tag";
import ClockIcon from "@/app/icons/ClockIcon";
import ProfileIcon from "@/app/icons/ProfileIcon";

function Separator() {
	return <div className="border-t border-gray-300 my-2" />;
}

export default async function ProfilePage({ params }) {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}
	const username = decodeURI(params.username);
	const user = await getUserByUsername(username);

	const formatDate = (dateString) => {
		if (!dateString) return "Unknown";
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};
	const userProjects = await getAllProjectsByUsername(username);
	const userEvents = (await getAllEventsByUsername(username)).sort(
		(a, b) => b.startDate - a.startDate,
	);

	return (
		<div className="flex justify-center">
			{user ? (
				<div className="w-full">
					<div className="md:flex justify-center px-2 md:px-8">
						<div className="flex flex-col mt-8 min-w-64 md:min-w-72">
							<div className="flex items-center md:block">
								<Image
									src={user?.imageUri ?? backupProfileImage}
									alt="Profile picture"
									width={300}
									height={300}
									className="border border-gray-400 w-24 h-24 object-cover md:w-72 md:h-72  rounded-full mb-3"
								/>
								<div className="w-full ml-2 md:ml-0">
									<h1 className="text-3xl">
										<b>{`${user?.firstName} ${user?.lastName}`}</b>
									</h1>
									<p className="text-xl text-gray-600 mb-2">
										<b>{user?.username}</b>
									</p>
								</div>
							</div>
							<p className="text-lg mb-2">{user?.bio ?? "No bio yet..."}</p>
							{session.user.username === user.username && (
								<LinkButton
									className="w-full text-center"
									href="/settings/profile"
								>
									Edit profile
								</LinkButton>
							)}
							<span className="flex items-center mt-2">
								<LocationIcon className="mr-1" /> {user?.location ?? "Unknown"}
							</span>
							<span className="flex items-center">
								<CakeIcon className="mr-1" /> {formatDate(user?.birthDate)}
							</span>
							<span className="flex items-center mb-4">
								<ProfileIcon width="18" height="18" className="mr-1" />
								<a
									className="text-blue-700 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
									href={`https://${getPureUrl(user?.socialUrl)}`}
								>
									{" "}
									{user?.socialUrl ?? "No socials"}
								</a>
							</span>
							<Separator />
							<h2 className="text-xl">
								<b>Achivements</b>
							</h2>
							<p className="text-gray-600 mb-4">Coming soon... :D</p>
							<Separator />
							<h2 className="text-xl">
								<b>Teams</b>
							</h2>
							<p className="text-gray-600">Coming soon... :D</p>
						</div>
						<div className="w-full mt-8 md:ml-6">
							<h1 className="text-2xl mb-2">
								<b>Projects</b>
							</h1>
							<div className="flex items-center gap-2 flex-wrap ">
								{userProjects.length > 0 ? (
									userProjects.map(mapProjectToSmallCard)
								) : (
									<p className="text-gray-600 mt-4">No projects found</p>
								)}
							</div>
							<Link
								href="/projects"
								className="mx-2 text-blue-700 hover:underline"
							>
								Apply for more projects
							</Link>
							<h1 className="text-2xl mt-4 mb-2">
								<b>Events attended</b>
							</h1>
							<div className="flex items-center gap-2 flex-wrap ">
								{userEvents.length > 0 ? (
									userEvents.map(mapEventToSmallCard)
								) : (
									<p className="text-gray-600 mt-4">No events attended</p>
								)}
							</div>
							<Link
								href="/events"
								className="mx-2 text-blue-700 hover:underline"
							>
								Check out upcoming events
							</Link>
						</div>
					</div>
				</div>
			) : (
				<p>User not found</p>
			)}
		</div>
	);
}

function mapProjectToSmallCard(project) {
	return (
		<div
			key={project._id}
			className="flex justify-between border 
                        border-gray-300 rounded p-2 w-full md:w-[48%] min-w-64 h-20 "
		>
			<div>
				<h1 className="text-xl">
					<b>{project.name}</b>
				</h1>
				<p className="text-sm text-gray-600">
					{trimProjectDescription(project.description, 40)}
				</p>
			</div>
			<LinkButton href={`/projects/${project.id}`} className="mt-3">
				View
			</LinkButton>
		</div>
	);
}

function mapEventToSmallCard(event) {
	const year = event.startDate.getFullYear();
	const month = event.startDate.toLocaleString("default", { month: "short" });
	const day = event.startDate.getDate();
	const time = event.startDate.toLocaleString("default", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div
			key={event._id}
			className="flex w-full border border-gray-300 md:w-[48%] min-w-64 min-h-20 "
		>
			<div className="md:rounded-l mr-3 py-2 bg-gray-700 min-w-24  flex flex-col justify-center items-center">
				<p className="text-white text-3xl">
					<b>{day}</b>
				</p>
				<p className="text-white">{month}</p>
				<p className="text-white text-2xl">
					<b>{year}</b>
				</p>
			</div>
			<div>
				<Link href={`/events/${event.id}`}>
					<p className="text-blue-700 text-lg hover:underline mt-2">
						<b>{event.name}</b>
					</p>
				</Link>
				<p className="text-sm text-gray-600">
					{trimProjectDescription(event.description, 50)}
				</p>
				<Tag className="flex items-center w-fit my-2 bg-yellow-200">
					<ClockIcon className="mr-1" />
					{time}
				</Tag>
			</div>
		</div>
	);
}

/**
 * @param {string} url
 * */
function getPureUrl(url) {
	if (!url) return "";
	const pureUrl = url.replace(/^https?:\/\//, "");
	console.log(pureUrl);
	return pureUrl;
}
