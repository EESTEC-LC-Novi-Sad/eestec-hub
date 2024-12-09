import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { createEvent } from "@/services/events.service";
import { broadcastNotification } from "@/services/notification.service";

export default async function NewEventPage() {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'board') {
        redirect('/login');
    }
    return (
        <div>
            <h1>New event page</h1>
            <br /><br />
            <form action={async (formData) => {
                "use server";
                const eventData = {
                    name: formData.get("ename"),
                    description: formData.get("description"),
                    startDate: formData.get("start-date"),
                    endDate: formData.get("end-date"),
                    location: formData.get("location"),
                    attendees: []
                };
                const event = await createEvent(eventData);
                broadcastNotification(
                    {
                        text: `New event: ${eventData.name} at ${eventData.startDate.toLocaleString('en-GB')}`,
                        notificationType: 'New events',
                        dateReceived: new Date(Date.now()),
                        link: `/events/${event.id}`
                    }
                );
                redirect("/events");
            }}>
                <input required type="text" name="ename" placeholder="Event Name" /><br />
                <br />
                <textarea required name="description" placeholder="Event Description" /><br />
                <br />
                <input required name="location" type="text" placeholder="Event location" /><br />
                <br />
                Starting date and time:
                <input required name="start-date" type="datetime-local" /><br />
                Ending date and time:
                <input required name="end-date" type="datetime-local" /><br />
                <br />
                <button type="submit">Create new event</button>
            </form>

        </div>
    )
}
