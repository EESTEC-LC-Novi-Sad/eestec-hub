import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getAllEventsByUsername} from "@/services/events.service";
import Link from "next/link";

export default async function({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userEvents = await getAllEventsByUsername(username);
    return (
        <div>
            <h1>Events you attended</h1>
            {userEvents.map((e, index) => <div key={index}>
                    <Link href={`/events/${e.id}`}>
                        <p>
                            <b>{e.name}</b> - starts at {" "}
                            {e.startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}
                        </p>
                    </Link>
                </div>)}

        </div>
    )
}
