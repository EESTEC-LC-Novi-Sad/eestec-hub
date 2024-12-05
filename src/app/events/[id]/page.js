import { getEventById } from "@/services/events.service"
import Link from "next/link";

export default async function EventByIdPage({ params }) {
    const event = await getEventById(params.id);
    return (
        <div>
            <p><b>Event name:</b> {event.name}</p>
            <p><b>Event description:</b> {event.description}</p>
            <p><b>Event start date:</b> {event.startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
            <p><b>Event end date:</b> {event.endDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
            <p><b>Event join code:</b> {event.code} (hide this for members)</p>
            <Link href={`/events/${event.id}/join`}>Click here to join event</Link>
        </div>
    )
}
