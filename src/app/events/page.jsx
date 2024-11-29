import { getAllEvents } from "@/services/events.service";
import { auth } from "../../../auth";

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
                        <p>{e.name}</p>
                    </div>
                })
            }
        </div>
    )
}
