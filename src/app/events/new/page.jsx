import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { createEvent } from "@/services/events.service";
import { broadcastNotification } from "@/services/notification.service";
import { Separator } from "@/app/lib/utils";
import Button from "../../components/Button";
import NewEventForm from "./NewEventForm";

export default async function NewEventPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    if (session.user.role !== "board") {
        redirect("/");
    }

    return <NewEventForm />;
}
