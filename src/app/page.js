import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getUserById } from "@/services/user.service";
import { getAllEvents } from "@/services/events.service";
import { getAllProjects } from "@/services/project.service";
import Link from "next/link";
import { mapEventToCard } from "./lib/utils";

export default async function Home() {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}
	const projects = await getAllProjects();
	const allEvents = await getAllEvents();
	const user = await getUserById(session.user.id);
	const upcomingEvents = allEvents.filter((e) => e.startDate >= new Date());

	return (
		<div className="flex justify-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-3xl mt-2">Hello, {session.user.username}</h1>
				<h1 className="text-lg mt-2">Your role: {user.role}</h1>
				<h1 className="text-lg mt-2">Your points: {user.points ?? 0}</h1>
				<h1 className="text-2xl mt-2">Upcoming events</h1>
				{upcomingEvents.map((e) => {
					return (
						<Link key={e.id} href={`/events/${e.id}`}>
							<p className="ml-2 text-blue-700 text-lg hover:underline mt-2">
								<b>{e.name}</b>
							</p>
						</Link>
					);
				})}
				<h1 className="text-2xl mt-2">Available projects</h1>
				{projects.slice(0, 5).map((p) => {
					return (
						<Link key={p.id} href={`/projects/${p.id}`}>
							<p className="ml-2 text-blue-700 text-lg hover:underline mt-2">
								<b>{p.name}</b>
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
