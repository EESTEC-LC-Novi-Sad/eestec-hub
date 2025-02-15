import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { createEvent } from "@/services/events.service";
import { broadcastNotification } from "@/services/notification.service";
import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";

export default async function NewEventPage() {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "board") {
		redirect("/login");
	}
	return (
		<div className="flex flex-col items-center">
			<div className="w-full md:w-5/12 px-2">
				<h1 className="text-2xl mt-4">
					<b>Create a new event</b>
				</h1>
				<p className="text-gray-600">
					All your members will be able to see this event. To attend an event
					they must know the code to get in!
				</p>
				<Separator />
				<p className="mb-4">
					<i>Required fields are marked with an asterix (*)</i>
				</p>
				<form
					className="inline-flex flex-col w-full"
					action={async (formData) => {
						"use server";
						const eventData = {
							name: formData.get("ename"),
							description: formData.get("description"),
							startDate: formData.get("start-date"),
							endDate: formData.get("end-date"),
							location: formData.get("location"),
							attendees: [],
						};
						const event = await createEvent(eventData);
						broadcastNotification({
							text: `New event: ${eventData.name} at ${eventData.startDate.toLocaleString("en-GB")}`,
							notificationType: "New events",
							dateReceived: new Date(Date.now()),
							link: `/events/${event.id}`,
						});
						redirect("/events");
					}}
				>
					<label htmlFor="pname">
						<b>Event name*</b>
					</label>
					<input
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						required
						type="text"
						name="ename"
					/>
					<label htmlFor="description">
						<b>Description*</b>
					</label>
					<textarea
						className="border rounded px-2 border-gray-300 mb-4"
						required
						name="description"
					/>
					<label htmlFor="location">
						<b>Event location*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="location"
						type="text"
					/>
					<label htmlFor="start-date">
						<b>Starting date and time*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="start-date"
						type="datetime-local"
						defaultValue={getTodaysDateString()}
						min={getTodaysDateString()}
					/>
					<label htmlFor="end-date">
						<b>Ending date and time*</b>
					</label>
					<input
						required
						className="border h-9 px-2 rounded border-gray-300 mb-4"
						name="end-date"
						type="datetime-local"
						defaultValue={getTodaysDateString()}
						min={getTodaysDateString()}
					/>
					<div className="flex flex-row-reverse">
						<Button className="w-full md:w-64 mt-4" type="submit">
							Create a new event
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

function getTodaysDateString() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dateStr = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}T00:00`;
	console.log(dateStr);
	return dateStr;
}
