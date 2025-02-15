import { getEventById, joinEvent } from "@/services/events.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { Separator } from "@/app/lib/utils";
import TeamsIcon from "../../../icons/TeamsIcon";
import Button from "../../../components/Button";

export default async function JoinEventPage({ params }) {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}

	const event = await getEventById(params.id);
	return (
		<div className="flex justify-center px-2">
			<div className="w-full md:w-6/12">
				<h1 className="text-3xl my-2">
					<b>{event.name}</b>
				</h1>
				<p className="text-gray-600">
					Please enter the secret code for this event. Your board should have
					provided you with the code, if not, you can always ask your neighbour
					for help!
				</p>
				<Separator />
				<span className="flex gap-1 mb-2 text-sm text-gray-600">
					<TeamsIcon width="18" height="18" />
					{event.attendees.length}
					{event.attendees.length === 1 ? " attendee" : " attendees"}
				</span>
				<form
					action={async (formData) => {
						"use server";

						const code = Number(formData.get("eventCode"));
						const eventCode = Number(event.code);
						if (!code || !eventCode) {
							console.log("Not a valid number");
							return;
						}
						if (eventCode !== code) {
							console.log("Invalid code");
							return;
						}

						const joinedEvent = await joinEvent(event.id, session.user.id);
						if (!joinedEvent) {
							console.log("Couldn't join event :(");
							redirect("/events");
						}
						console.log("Successfuly joined event");
						redirect("/events");
					}}
				>
					<input
						className="w-full px-2 border h-9 rounded border-gray-300 mb-4"
						type="number"
						name="eventCode"
					/>
					<div className="flex justify-center">
						<Button className="md:w-40 w-full" type="submit">
							Join
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
