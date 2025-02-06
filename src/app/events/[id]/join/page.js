import { getEventById, joinEvent } from "@/services/events.service";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";

export default async function JoinEventPage({ params }) {
	const event = await getEventById(params.id);
	const session = await auth();
	return (
		<div>
			<p>Join event {event.name}</p>
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
				<input type="number" name="eventCode" />
				<br />
				<br />
				<button>Join</button>
			</form>
			{}
		</div>
	);
}
