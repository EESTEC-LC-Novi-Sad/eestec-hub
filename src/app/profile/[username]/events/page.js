import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getAllEventsByUsername} from "@/services/events.service";
import { mapEventToCard } from "../../../lib/utils";
import Link from "next/link";

export default async function EventsByUsernamePage({params}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const { username } = params;
    const userEvents = (await getAllEventsByUsername(username)).sort((a, b) => b.startDate - a.startDate);
    const eventYears = [...new Set(userEvents.map(e => e.startDate.getFullYear()))];
    const eventsByYear = eventYears.map(year => userEvents.filter(e => e.startDate.getFullYear() === year));

    return (
        <div className="flex justify-center">
            <div className="w-full md:w-7/12">
                <h1 className="text-2xl"><b>Events you attended</b></h1>
                { !userEvents || userEvents.length === 0
                    ? <p>You have not attended any events</p>
                    : <div>{ eventsByYear.map((year, index) => {
                        return <div key={`year-${index}`}>
                            <h1 className="text-center text-3xl mt-2"><b>{year[0].startDate.getFullYear()}</b></h1>
                            {year.map(mapEventToCard)}
                        </div>
                    })}
                    </div>
                }
            </div>
        </div>
    )
}
