import { getAllEvents } from "@/services/events.service";
import { auth } from "../../../auth";
import Link from "next/link";

export default async function EventsPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/login');
    }
    const events = await getAllEvents()
    return (
        <div>
            <h1>Events page</h1>
            {
                events.map((e, index) => {
                    return <div key={index}>
                        <Link href={`events/${e.id}`}>
                            <p>
                                <b>{e.name}</b> - starts at {" "}
                                {e.startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}
                            </p>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}
