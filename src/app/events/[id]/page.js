import { getEventById } from "@/services/events.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import Link from "next/link";
import Tag from "../../components/Tag";
import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";
import TeamsIcon from "../../icons/TeamsIcon";
import ClockIcon from "../../icons/ClockIcon";
import EventsIcon from "../../icons/EventsIcon";
import ShowCodeButton from "./ShowCodeButton";
import { Separator } from "@/app/lib/utils";
import JoinEventButton from "./JoinEventButton";

export default async function EventByIdPage({ params }) {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}

	const isBoard = session.user.role === "board";

	const event = await getEventById(params.id);

	return (
		<div className="flex justify-center px-2">
			{!event ? (
				<h1 className="text-2xl mt-4">Event not found</h1>
			) : (
				<div className="w-full md:w-6/12">
					<h1 className="text-3xl my-2">
						<b>{event.name}</b>
					</h1>
					<Separator />
					<span className="flex gap-1 mb-2 text-sm text-gray-600">
						<TeamsIcon width="18" height="18" />
						{event.attendees.length}
						{event.attendees.length === 1 ? " attendee" : " attendees"}
					</span>
					<p className="text-lg">{event.description}</p>
					<div className="flex gap-2">
						<Tag className="w-fit flex items-center gap-1">
							<EventsIcon width="16" height="16" />
							{event.startDate.toDateString()}
						</Tag>
						<Tag className="w-fit flex items-center gap-1">
							<ClockIcon width="16" height="16" />
							{event.startDate.toLocaleTimeString("en-US")}
						</Tag>
					</div>
					<div className="flex gap-2 mt-4">
						{isBoard && <ShowCodeButton secretCode={event.code} />}
						<JoinEventButton event={event} session={session} />
					</div>
				</div>
			)}
		</div>
	);
}
