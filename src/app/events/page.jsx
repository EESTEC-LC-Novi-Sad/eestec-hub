import { getAllEvents } from "@/services/events.service";
import { auth } from "../../../auth";
import { mapEventToCard } from "../lib/utils";
import { Separator } from "@/app/lib/utils";
import Card from "../components/Card";
import LinkButton from "../components/LinkButton";

export default async function EventsPage() {
	const session = await auth();
	if (!session || !session.user) {
		redirect("/login");
	}

	const isBoard = session.user.role === "board";

	const events = (await getAllEvents()).sort(
		(a, b) => b.startDate - a.startDate,
	);
	const eventYears = [...new Set(events.map((e) => e.startDate.getFullYear()))];

	const upcomingEvents = events.filter((e) => e.startDate >= new Date());
	const pastEvents = events.filter((e) => e.startDate < new Date());

	const upcomingEventsByYear = eventYears.map((year) =>
		upcomingEvents.filter((e) => e.startDate.getFullYear() === year),
	);
	const pastEventsByYear = eventYears.map((year) =>
		pastEvents.filter((e) => e.startDate.getFullYear() === year),
	);

	return (
		<div className="flex justify-center">
			<div className="w-full md:w-7/12">
				{isBoard && (
					<Card className="bg-gray-100 w-full flex flex-col items-center">
						<LinkButton href="/events/new">Create new event</LinkButton>
					</Card>
				)}
				<h1 className="text-2xl">
					<b>Upcoming events</b>
				</h1>
				{!upcomingEvents || upcomingEvents.length === 0 ? (
					<p className="ml-4 text-gray-700 text-sm">No upcoming events</p>
				) : (
					<div>
						{upcomingEventsByYear.map((year, index) => {
							return (
								<div key={`year-${index}`}>
									<h1 className="text-center text-3xl mt-2">
										<b>{year[0]?.startDate.getFullYear()}</b>
									</h1>
									{year.map(mapEventToCard)}
								</div>
							);
						})}
					</div>
				)}
				<Separator />
				<h1 className="text-2xl">
					<b>Past events</b>
				</h1>
				{!pastEvents || pastEvents.length === 0 ? (
					<p className="ml-4 text-gray-700 text-sm">No past events</p>
				) : (
					<div>
						{pastEventsByYear.map((year, index) => {
							return (
								<div key={`year-${index}`}>
									<h1 className="text-center text-3xl mt-2">
										<b>{year[0]?.startDate.getFullYear()}</b>
									</h1>
									{year.map(mapEventToCard)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

// {event.startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}
